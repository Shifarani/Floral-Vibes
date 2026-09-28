const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");

// ---------------------------------------
// AUTOMATIC ORDER STATUS
// ---------------------------------------
const getAutomaticStatus = (order) => {
  // If admin/user manually changed tracking,
  // do not automatically change status.
  if (!order.isTrackingAutomatic) {
    return order.orderStatus;
  }

  // Cancelled order should stay cancelled.
  if (order.orderStatus === "Cancelled") {
    return "Cancelled";
  }

  const createdTime = new Date(order.createdAt).getTime();
  const now = Date.now();

  // Expected delivery date
 const deliveryTime = order.expectedDeliveryDate
  ? new Date(order.expectedDeliveryDate).getTime()
  : createdTime + 24 * 60 * 60 * 1000;
  
  const totalDeliveryTime = deliveryTime - createdTime;
  const timePassed = now - createdTime;

  // Safety
  if (totalDeliveryTime <= 0) {
    return "Delivered";
  }

  // Percentage of delivery time completed
  const progress = timePassed / totalDeliveryTime;

  // ---------------------------------------
  // STATUS TIMELINE
  // ---------------------------------------

  if (progress < 0.10) {
    return "Placed";
  }

  if (progress < 0.25) {
    return "Confirmed";
  }

  if (progress < 0.50) {
    return "Processing";
  }

  if (progress < 0.75) {
    return "Shipped";
  }

  if (progress < 1) {
    return "Out for Delivery";
  }

  return "Delivered";
};


// ---------------------------------------
// CREATE ORDER
// ---------------------------------------
const createOrder = async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod,
      deliveryMethod,
      couponCode,
    } = req.body;

    const userId = req.user.userId;

    // ---------------------------------------
    // CHECK SHIPPING ADDRESS
    // ---------------------------------------

    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete shipping address",
      });
    }

    // ---------------------------------------
    // GET USER CART
    // ---------------------------------------

    const cart = await Cart.findOne({
      user: userId,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // ---------------------------------------
    // PRODUCTS + STOCK
    // ---------------------------------------

    const orderItems = [];
    let subtotal = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product.name}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} ${product.name} available in stock`,
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      });

      subtotal += product.price * item.quantity;
    }

    // ---------------------------------------
    // DELIVERY CHARGE
    // ---------------------------------------

    let deliveryCharge = 0;

    if (deliveryMethod === "express") {
      deliveryCharge = 99;
    } else {
      deliveryCharge = subtotal >= 999 ? 0 : 49;
    }

    // ---------------------------------------
    // COUPON VALIDATION
    // ---------------------------------------

    let discountAmount = 0;
    let appliedCouponCode = null;
    let appliedCoupon = null;

    if (couponCode) {
      const enteredCode = couponCode
        .trim()
        .toUpperCase();

      const coupon = await Coupon.findOne({
        code: enteredCode,
      });

      if (!coupon) {
        return res.status(400).json({
          success: false,
          message: "Invalid coupon code",
        });
      }

      if (!coupon.isActive) {
        return res.status(400).json({
          success: false,
          message: "This coupon is inactive",
        });
      }

      if (coupon.used) {
        return res.status(400).json({
          success: false,
          message: "This coupon has already been used",
        });
      }

      if (new Date() > coupon.expiresAt) {
        return res.status(400).json({
          success: false,
          message: "This coupon has expired",
        });
      }

      if (
        coupon.user &&
        coupon.user.toString() !== userId.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "This coupon does not belong to you",
        });
      }

      if (subtotal < coupon.minOrderAmount) {
        return res.status(400).json({
          success: false,
          message: `Minimum order amount is ₹${coupon.minOrderAmount}`,
        });
      }

      // Percentage discount
      if (coupon.discountType === "percentage") {
        discountAmount = Math.round(
          (subtotal * coupon.discountValue) / 100
        );

        if (
          coupon.maxDiscount !== null &&
          discountAmount > coupon.maxDiscount
        ) {
          discountAmount = coupon.maxDiscount;
        }
      }

      // Fixed discount
      else {
        discountAmount = coupon.discountValue;

        if (discountAmount > subtotal) {
          discountAmount = subtotal;
        }
      }

      appliedCouponCode = coupon.code;
      appliedCoupon = coupon;
    }

    // ---------------------------------------
    // FINAL TOTAL
    // ---------------------------------------

    const totalAmount =
      subtotal +
      deliveryCharge -
      discountAmount;

    // ---------------------------------------
    // REAL ORDER DATE
    // ---------------------------------------

    const orderDate = new Date();

    // ---------------------------------------
    // RANDOM DELIVERY TIME
    // 40 MINUTES TO 24 HOURS
    // ---------------------------------------

    // Random time between 40 minutes and 24 hours
    const minMinutes = 40;
    const maxMinutes = 24 * 60;

    const randomMinutes =
      Math.floor(
        Math.random() * (maxMinutes - minMinutes + 1)
      ) + minMinutes;

    const expectedDeliveryDate = new Date(
      orderDate.getTime() +
        randomMinutes * 60 * 1000
    );

    // ---------------------------------------
    // CREATE ORDER
    // ---------------------------------------

    const order = await Order.create({
      user: userId,

      items: orderItems,

      shippingAddress,

      paymentMethod:
        paymentMethod || "COD",

      paymentStatus: "Pending",

      orderStatus: "Placed",

      expectedDeliveryDate,

      deliveredAt: null,

      isTrackingAutomatic: true,

      couponCode: appliedCouponCode,

      discountAmount,

      deliveryCharge,

      totalAmount,
    });

    // ---------------------------------------
    // MARK COUPON AS USED
    // ---------------------------------------

    if (appliedCoupon) {
      await Coupon.findByIdAndUpdate(
        appliedCoupon._id,
        {
          used: true,
          isActive: false,
        }
      );
    }

    // ---------------------------------------
    // REDUCE PRODUCT STOCK
    // ---------------------------------------

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.product._id,
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );
    }

    // ---------------------------------------
    // CLEAR CART
    // ---------------------------------------

    cart.items = [];

    await cart.save();

    // ---------------------------------------
    // RESPONSE
    // ---------------------------------------

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error(
      "Create order error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};


// ---------------------------------------
// GET LOGGED-IN USER ORDERS
// ---------------------------------------
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.userId,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    // ---------------------------------------
    // UPDATE AUTOMATIC STATUS
    // ---------------------------------------

    for (const order of orders) {
      if (
        order.isTrackingAutomatic &&
        order.orderStatus !== "Cancelled"
      ) {
        const newStatus =
          getAutomaticStatus(order);

        // If delivered
        if (
          newStatus === "Delivered" &&
          order.orderStatus !== "Delivered"
        ) {
          order.orderStatus = "Delivered";

          if (!order.deliveredAt) {
            order.deliveredAt = new Date();
          }

          await order.save();
        }

        // Other statuses
        else if (
          order.orderStatus !== newStatus
        ) {
          order.orderStatus = newStatus;

          await order.save();
        }
      }
    }

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error(
      "Get user orders error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: error.message,
    });
  }
};


// ---------------------------------------
// GET SINGLE ORDER
// ---------------------------------------
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.userId,
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ---------------------------------------
    // UPDATE AUTOMATIC STATUS
    // ---------------------------------------

    if (
      order.isTrackingAutomatic &&
      order.orderStatus !== "Cancelled"
    ) {
      const newStatus =
        getAutomaticStatus(order);

      // Delivered
      if (
        newStatus === "Delivered" &&
        order.orderStatus !== "Delivered"
      ) {
        order.orderStatus = "Delivered";

        if (!order.deliveredAt) {
          order.deliveredAt = new Date();
        }

        await order.save();
      }

      // Other status
      else if (
        order.orderStatus !== newStatus
      ) {
        order.orderStatus = newStatus;

        await order.save();
      }
    }

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(
      "Get single order error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get order",
      error: error.message,
    });
  }
};


// ---------------------------------------
// GET ALL ORDERS - ADMIN ONLY
// ---------------------------------------
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    // ---------------------------------------
    // UPDATE AUTOMATIC STATUS
    // ---------------------------------------

    for (const order of orders) {
      if (
        order.isTrackingAutomatic &&
        order.orderStatus !== "Cancelled"
      ) {
        const newStatus =
          getAutomaticStatus(order);

        // Delivered
        if (
          newStatus === "Delivered" &&
          order.orderStatus !== "Delivered"
        ) {
          order.orderStatus = "Delivered";

          if (!order.deliveredAt) {
            order.deliveredAt = new Date();
          }

          await order.save();
        }

        // Other status
        else if (
          order.orderStatus !== newStatus
        ) {
          order.orderStatus = newStatus;

          await order.save();
        }
      }
    }

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error(
      "Get all orders error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get all orders",
      error: error.message,
    });
  }
};


// ---------------------------------------
// UPDATE ORDER STATUS - ADMIN ONLY
// ---------------------------------------
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const allowedStatuses = [
      "Placed",
      "Confirmed",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const updateData = {
      orderStatus,
      isTrackingAutomatic: false,
    };

    // ---------------------------------------
    // IF ADMIN MARKS DELIVERED
    // ---------------------------------------

    if (orderStatus === "Delivered") {
      updateData.deliveredAt =
        new Date();
    }

    // ---------------------------------------
    // IF ADMIN CANCELS
    // ---------------------------------------

    if (orderStatus === "Cancelled") {
      updateData.deliveredAt = null;
    }

    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Order status updated successfully",
      order,
    });

  } catch (error) {
    console.error(
      "Update order status error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update order status",
      error: error.message,
    });
  }
};


// ---------------------------------------
// CANCEL ORDER - USER
// ---------------------------------------
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ---------------------------------------
    // ALREADY CANCELLED
    // ---------------------------------------

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled",
      });
    }

    // ---------------------------------------
    // CANNOT CANCEL AFTER SHIPPING
    // ---------------------------------------

    if (
      order.orderStatus === "Shipped" ||
      order.orderStatus === "Out for Delivery" ||
      order.orderStatus === "Delivered"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This order can no longer be cancelled",
      });
    }

    // ---------------------------------------
    // CANCEL ORDER
    // ---------------------------------------

    order.orderStatus = "Cancelled";

    order.isTrackingAutomatic = false;

    order.deliveredAt = null;

    await order.save();

    // ---------------------------------------
    // RESTORE PRODUCT STOCK
    // ---------------------------------------

    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: item.quantity,
          },
        }
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Order cancelled successfully",
      order,
    });

  } catch (error) {
    console.error(
      "Cancel order error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to cancel order",
      error: error.message,
    });
  }
};


// ---------------------------------------
// EXPORTS
// ---------------------------------------

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
};