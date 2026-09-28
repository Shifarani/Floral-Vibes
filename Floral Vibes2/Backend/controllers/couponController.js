const Coupon = require("../models/Coupon");
const crypto = require("crypto");

// CREATE COUPON - ADMIN ONLY
const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscount,
      expiresAt,
    } = req.body;

    if (
      !code ||
      !discountType ||
      discountValue === undefined ||
      !expiresAt
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required coupon details",
      });
    }

    if (!["percentage", "fixed"].includes(discountType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid discount type",
      });
    }

    if (discountValue <= 0) {
      return res.status(400).json({
        success: false,
        message: "Discount value must be greater than 0",
      });
    }

    if (discountType === "percentage" && discountValue > 100) {
      return res.status(400).json({
        success: false,
        message: "Percentage discount cannot be more than 100%",
      });
    }

    const existingCoupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
    });

    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: "Coupon code already exists",
      });
    }

    const coupon = await Coupon.create({
      code: code.trim().toUpperCase(),
      discountType,
      discountValue,
      minOrderAmount: minOrderAmount || 0,
      maxDiscount:
        maxDiscount !== undefined && maxDiscount !== ""
          ? maxDiscount
          : null,
      expiresAt,
      isActive: true,
      user: null,
      used: false,
    });

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create coupon",
      error: error.message,
    });
  }
};


// GET ALL COUPONS - ADMIN ONLY
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get coupons",
      error: error.message,
    });
  }
};


// GENERATE RANDOM COUPON - USER
const generateCoupon = async (req, res) => {
  try {
    const { subtotal } = req.body;

    // Coupon sirf ₹500+ order par milega
    if (subtotal === undefined || subtotal < 500) {
      return res.status(400).json({
        success: false,
        message: "Coupon is available only on orders of ₹500 or more",
      });
    }

    const userId = req.user.userId;

    // Check if user already has an active unused generated coupon
    const existingCoupon = await Coupon.findOne({
      user: userId,
      isActive: true,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (existingCoupon) {
      return res.status(200).json({
        success: true,
        message: "You already have an active coupon",
        coupon: {
          code: existingCoupon.code,
          expiresAt: existingCoupon.expiresAt,
        },
      });
    }

    // Generate random code
    let code;

    do {
      code =
        "FV" +
        crypto
          .randomBytes(4)
          .toString("hex")
          .toUpperCase();
    } while (await Coupon.findOne({ code }));

    // 20% discount, maximum ₹200
    const expiresAt = new Date(
      Date.now() + 30 * 60 * 1000
    );

    const coupon = await Coupon.create({
      code,
      discountType: "percentage",
      discountValue: 20,
      minOrderAmount: 500,
      maxDiscount: 200,
      expiresAt,
      isActive: true,
      user: userId,
      used: false,
    });

    res.status(201).json({
      success: true,
      message: "Your coupon has been generated!",
      coupon: {
        code: coupon.code,
        expiresAt: coupon.expiresAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate coupon",
      error: error.message,
    });
  }
};


// VALIDATE COUPON - USER
const validateCoupon = async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Please enter a coupon code",
      });
    }

    if (subtotal === undefined || subtotal < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid subtotal",
      });
    }

    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
    });

    if (!coupon) {
      return res.status(404).json({
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

    // Generated coupon sirf usi user ka hoga
    if (
      coupon.user &&
      coupon.user.toString() !== req.user.userId.toString()
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

    let discount = 0;

    if (coupon.discountType === "percentage") {
      discount = Math.round(
        (subtotal * coupon.discountValue) / 100
      );

      if (
        coupon.maxDiscount !== null &&
        discount > coupon.maxDiscount
      ) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;

      if (discount > subtotal) {
        discount = subtotal;
      }
    }

    res.status(200).json({
      success: true,
      message: `Coupon applied successfully! You saved ₹${discount}`,
      coupon: {
        id: coupon._id,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },
      discount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to validate coupon",
      error: error.message,
    });
  }
};


// DELETE COUPON - ADMIN ONLY
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete coupon",
      error: error.message,
    });
  }
};


module.exports = {
  createCoupon,
  getCoupons,
  generateCoupon,
  validateCoupon,
  deleteCoupon,
};