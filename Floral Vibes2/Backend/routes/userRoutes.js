const express = require("express");

const { updateProfileImage } = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.put(
  "/profile-image",
  protect,
  upload.single("profileImage"),
  updateProfileImage
);

module.exports = router;