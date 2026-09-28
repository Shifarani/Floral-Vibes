const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "floral-vibes/profiles",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const cloudinaryResult = await uploadToCloudinary();

    user.profileImage = cloudinaryResult.secure_url;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Profile image upload error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update profile picture",
      error: error.message,
    });
  }
};

module.exports = {
  updateProfileImage,
};