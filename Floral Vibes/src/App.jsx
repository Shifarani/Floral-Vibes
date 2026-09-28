
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import ExploreFlowers from "./pages/ExploreFlowers";
import AddProduct from "./pages/Admin/AddProduct";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EditProduct from "./pages/Admin/EditProduct";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/Blog" element={<Blog />} />
         <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
         <Route path="/Signup" element={<Signup />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/explore-flowers" element={<ExploreFlowers />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/MyOrders" element={<MyOrders />} />
        <Route
            path="/product/:id"
            element={<ProductDetails />}
          />
        
      </Routes>

      <Footer />
    </>
  );
}

export default App;
