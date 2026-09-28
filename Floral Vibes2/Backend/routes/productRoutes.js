const express = require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get single product
router.get("/:id", getProductById);

// Create new product - Admin only
router.post("/", protect, adminOnly, upload.single("image"), createProduct);
// Update product - Admin only
router.put("/:id", protect, adminOnly, updateProduct);

// Delete product - Admin only
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;