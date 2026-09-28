const express = require("express");

const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// Create order - Logged-in user
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/my-orders", protect, getUserOrders);

// Get all orders - Admin only
router.get("/admin/all", protect, adminOnly, getAllOrders);

// Update order status - Admin only
router.put("/admin/:id/status", protect, adminOnly, updateOrderStatus);

// Cancel own order - Logged-in user
router.put("/:id/cancel", protect, cancelOrder);

// Get single order - Logged-in user
router.get("/:id", protect, getOrderById);

module.exports = router;