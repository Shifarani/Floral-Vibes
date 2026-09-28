const Cart = require("../models/Cart");
const Product = require("../models/Product");

// GET CART
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.userId,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
        },
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get cart",
      error: error.message,
    });
  }
};

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    // Check productId
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check quantity
    const addQuantity = Number(quantity) || 1;

    if (addQuantity < 1 || !Number.isInteger(addQuantity)) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive whole number",
      });
    }

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check stock
    if (product.stock < addQuantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items are available in stock`,
      });
    }

    let cart = await Cart.findOne({
      user: userId,
    });

    // Create new cart
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity: addQuantity,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      // Product already in cart
      if (existingItem) {
        const newQuantity = existingItem.quantity + addQuantity;

        if (newQuantity > product.stock) {
          return res.status(400).json({
            success: false,
            message: `Only ${product.stock} items are available in stock`,
          });
        }

        existingItem.quantity = newQuantity;
      } else {
        // New product in existing cart
        cart.items.push({
          product: productId,
          quantity: addQuantity,
        });
      }

      await cart.save();
    }

    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
      error: error.message,
    });
  }
};
// UPDATE CART QUANTITY
const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const newQuantity = Number(quantity);

    if (!newQuantity || newQuantity < 1 || !Number.isInteger(newQuantity)) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive whole number",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (newQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items are available in stock`,
      });
    }

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    item.quantity = newQuantity;

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update cart quantity",
      error: error.message,
    });
  }
};

// CLEAR CART
const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
      error: error.message,
    });
  }
};


// REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemExists = cart.items.some(
      (item) => item.product.toString() === productId
    );

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove product",
      error: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};

