const express = require("express");

const {
  createCoupon,
  getCoupons,
  generateCoupon,
  validateCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// Create coupon - Admin only
router.post("/", protect, adminOnly, createCoupon);

// Get all coupons - Admin only
router.get("/", protect, adminOnly, getCoupons);

// Validate coupon - Logged-in user
router.post("/validate", protect, validateCoupon);

router.post("/generate", protect, generateCoupon);

// Delete coupon - Admin only
router.delete("/:id", protect, adminOnly, deleteCoupon);

module.exports = router;