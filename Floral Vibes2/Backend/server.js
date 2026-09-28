const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const couponRoutes = require("./routes/couponRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Product Routes
app.use("/api/products", productRoutes);

//auth routes
app.use("/api/auth", authRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);

app.use("/api/users", userRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Floral Vibes Backend is running 🌸");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});