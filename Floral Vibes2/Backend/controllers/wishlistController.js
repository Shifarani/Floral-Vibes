const mongoose = require("mongoose");
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// GET WISHLIST
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.user.userId,
    }).populate("products");

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        wishlist: {
          products: [],
        },
      });
    }

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get wishlist",
      error: error.message,
    });
  }
};

// ADD TO WISHLIST
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
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

    let wishlist = await Wishlist.findOne({
      user: userId,
    });

    // Create new wishlist
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        products: [productId],
      });
    } else {
      // Check duplicate
      const alreadyExists = wishlist.products.some(
        (product) => product.toString() === productId
      );

      if (alreadyExists) {
        return res.status(400).json({
          success: false,
          message: "Product already in wishlist",
        });
      }

      wishlist.products.push(productId);

      await wishlist.save();
    }

    await wishlist.populate("products");

    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add product to wishlist",
      error: error.message,
    });
  }
};

// REMOVE FROM WISHLIST
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const wishlist = await Wishlist.findOne({
      user: userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    const productExists = wishlist.products.some(
      (product) => product.toString() === productId
    );

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate("products");

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove product from wishlist",
      error: error.message,
    });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};