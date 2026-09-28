const express = require("express");

const {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getCart);

router.post("/add", protect, addToCart);

router.put("/update", protect, updateCartQuantity);

router.delete("/remove", protect, removeFromCart);

router.delete("/clear", protect, clearCart);

module.exports = router;