
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import {
  ArrowLeft,
  ShoppingBag,
  MapPin,
  Truck,
  CreditCard,
  Smartphone,
  Banknote,
  Tag,
  CheckCircle,
  Lock,
  Gift,
} from "lucide-react";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
const [cartLoading, setCartLoading] = useState(true);
const [placingOrder, setPlacingOrder] = useState(false);
const [placedOrder, setPlacedOrder] = useState(null);

  // -----------------------------
  // FORM STATES
  // -----------------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("cod");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [generatedCoupon, setGeneratedCoupon] = useState("");
const [showCouponPopup, setShowCouponPopup] = useState(false);
const [generatingCoupon, setGeneratingCoupon] = useState(false);

  // -----------------------------
  // DEMO CART DATA
  // Later backend/cart context se ayega
  // -----------------------------

  useEffect(() => {
  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setCartItems(response.data.cart.items || []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setCartLoading(false);
    }
  };

  fetchCart();
}, []);


  
  // -----------------------------
  // CALCULATIONS
  // -----------------------------
 const subtotal = cartItems.reduce(
  (total, item) =>
    total + item.product.price * item.quantity,
  0
);

  const deliveryCharge =
    delivery === "express" ? 99 : subtotal >= 999 ? 0 : 49;

  const total = subtotal + deliveryCharge - discount;

  // -----------------------------
  // INPUT CHANGE
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // -----------------------------
  // COUPON
  // -----------------------------

  const generateCoupon = async () => {
  if (subtotal < 500) {
    setCouponMessage("❌ Coupon is available only on orders of ₹500 or more");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    setCouponMessage("❌ Please login first");
    return;
  }

  try {
    setGeneratingCoupon(true);

    const response = await axiosInstance.post(
      "/coupons/generate",
      {
        subtotal,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      setGeneratedCoupon(response.data.coupon.code);
      setShowCouponPopup(true);
    }
  } catch (error) {
    setCouponMessage(
      `❌ ${
        error.response?.data?.message ||
        "Failed to generate coupon"
      }`
    );
  } finally {
    setGeneratingCoupon(false);
  }
};


  const applyCoupon = async () => {
  const code = coupon.trim().toUpperCase();

  if (!code) {
    setDiscount(0);
    setCouponMessage("❌ Please enter a coupon code");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    setDiscount(0);
    setCouponMessage("❌ Please login first");
    return;
  }

  try {
    const response = await axiosInstance.post(
      "/coupons/validate",
      {
        code,
        subtotal,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      setDiscount(response.data.discount);

      setCouponMessage(
        `🎉 Coupon applied! You saved ₹${response.data.discount}`
      );
    }
  } catch (error) {
    setDiscount(0);

    setCouponMessage(
      `❌ ${
        error.response?.data?.message ||
        "Invalid coupon code"
      }`
    );
  }
};

  // -----------------------------
  // PLACE ORDER
  // -----------------------------
  const handlePlaceOrder = async (e) => {
  e.preventDefault();

  const {
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
  } = formData;

  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !pincode
  ) {
    alert("Please fill all delivery details.");
    return;
  }

  if (phone.length !== 10) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  if (pincode.length !== 6) {
    alert("Please enter a valid 6-digit pincode.");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first.");
    navigate("/login");
    return;
  }

  try {
    setPlacingOrder(true);

   const response = await axiosInstance.post(
  "/orders",
  {
    shippingAddress: {
      fullName: name,
      phone,
      address,
      city,
      state,
      pincode,
    },

    paymentMethod: payment === "cod" ? "COD" : "ONLINE",

    deliveryMethod: delivery,

    couponCode: coupon.trim()
      ? coupon.trim().toUpperCase()
      : null,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

   if (response.data.success) {
  setPlacedOrder(response.data.order);
  setOrderPlaced(true);

  window.dispatchEvent(new Event("cartUpdated"));

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Failed to place order"
    );
  } finally {
    setPlacingOrder(false);
  }
};
  

  // -----------------------------
  // ORDER SUCCESS SCREEN
  // -----------------------------
  if (orderPlaced) {
    return (
      <>
        <style>{`
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: #fffafc;
          }

          .success-page {
            min-height: 75vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 50px 20px;
          }

          .success-card {
            width: 100%;
            max-width: 650px;
            background: white;
            padding: 50px 30px;
            text-align: center;
            border-radius: 24px;
            box-shadow: 0 10px 35px rgba(0,0,0,0.08);
          }

          .success-icon {
            width: 90px;
            height: 90px;
            margin: 0 auto 20px;
            border-radius: 50%;
            background: #e9f8ee;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .success-card h1 {
            font-size: 32px;
            margin-bottom: 12px;
            color: #333;
          }

          .success-card p {
            color: #777;
            font-size: 16px;
            line-height: 1.6;
          }

          .order-number {
            margin: 25px auto;
            padding: 15px;
            background: #fff3f7;
            border-radius: 12px;
            font-weight: bold;
            color: #b64b70;
          }

          .success-buttons {
            display: flex;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 25px;
          }

          .success-btn {
            border: none;
            padding: 13px 25px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 600;
          }

          .shop-btn {
            background: #b64b70;
            color: white;
          }

          .home-btn {
            background: #f4f4f4;
            color: #333;
          }
        `}</style>

        <div className="success-page">
          <div className="success-card">

            <div className="success-icon">
              <CheckCircle size={55} color="#2e9d55" />
            </div>

            <h1>Order Placed Successfully! 🎉</h1>

            <p>
              Thank you for shopping with <strong>Floral Vibes</strong>.
              Your beautiful flowers are on their way!
            </p>

            <div className="order-number">
            Order ID: #{placedOrder?._id}
          </div>

            <p>
              You will receive your order at the address provided during
              checkout.
            </p>

            <div className="success-buttons">
              <button
                className="success-btn shop-btn"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </button>

              <button
                className="success-btn home-btn"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>

          </div>
        </div>
      </>
    );
  }

  // -----------------------------
  // MAIN CHECKOUT PAGE
  // -----------------------------
  return (
    <>
      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #fffafc;
        }

        .checkout-page {
          min-height: 80vh;
          padding: 40px 6%;
        }

        /* HEADER */

        .checkout-header {
          max-width: 1200px;
          margin: 0 auto 35px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          border: none;
          background: transparent;
          color: #777;
          cursor: pointer;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .back-btn:hover {
          color: #b64b70;
        }

        .checkout-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .checkout-title h1 {
          margin: 0;
          font-size: 34px;
          color: #333;
        }

        .checkout-subtitle {
          color: #777;
          margin-top: 8px;
        }

        /* MAIN GRID */

        .checkout-container {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 30px;
          align-items: start;
        }

        /* CARDS */

        .checkout-card {
          background: white;
          border-radius: 18px;
          padding: 25px;
          margin-bottom: 22px;
          box-shadow: 0 7px 25px rgba(0,0,0,0.06);
        }

        .card-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
        }

        .card-title h2 {
          margin: 0;
          font-size: 20px;
          color: #333;
        }

        /* FORM */

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 17px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .input-group label {
          font-size: 14px;
          font-weight: 600;
          color: #555;
        }

        .input-group input,
        .input-group textarea {
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 12px 13px;
          outline: none;
          font-size: 14px;
          transition: 0.2s;
          font-family: inherit;
        }

        .input-group textarea {
          min-height: 90px;
          resize: vertical;
        }

        .input-group input:focus,
        .input-group textarea:focus {
          border-color: #b64b70;
          box-shadow: 0 0 0 3px rgba(182,75,112,0.08);
        }

        /* DELIVERY */

        .delivery-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .option-box {
          border: 1.5px solid #ddd;
          border-radius: 13px;
          padding: 17px;
          cursor: pointer;
          transition: 0.2s;
        }

        .option-box:hover {
          border-color: #b64b70;
        }

        .option-box.active {
          border-color: #b64b70;
          background: #fff5f8;
        }

        .option-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .option-left {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .option-box strong {
          font-size: 14px;
        }

        .option-box small {
          display: block;
          color: #777;
          margin-top: 7px;
          margin-left: 28px;
        }

        .option-price {
          font-weight: bold;
          color: #b64b70;
        }

        /* PAYMENT */

        .payment-options {
          display: grid;
          gap: 12px;
        }

        .payment-option {
          display: flex;
          align-items: center;
          gap: 13px;
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 12px;
          cursor: pointer;
        }

        .payment-option.active {
          border-color: #b64b70;
          background: #fff5f8;
        }

        .payment-option input {
          accent-color: #b64b70;
        }

        .payment-icon {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8edf1;
          border-radius: 8px;
          color: #b64b70;
        }

        .payment-text strong {
          display: block;
          font-size: 14px;
        }

        .payment-text small {
          color: #777;
        }

        /* ORDER SUMMARY */

        .summary-card {
          position: sticky;
          top: 20px;
        }

        .product-item {
          display: flex;
          align-items: center;
          gap: 13px;
          padding-bottom: 16px;
          margin-bottom: 16px;
          border-bottom: 1px solid #eee;
        }

        .product-item img {
          width: 65px;
          height: 65px;
          object-fit: cover;
          border-radius: 10px;
        }

        .product-info {
          flex: 1;
        }

        .product-info h4 {
          margin: 0 0 5px;
          font-size: 14px;
          color: #333;
        }

        .product-info p {
          margin: 0;
          font-size: 13px;
          color: #888;
        }

        .product-price {
          font-weight: bold;
          color: #333;
        }

        /* COUPON */

        .coupon-box {
          display: flex;
          gap: 8px;
          margin: 20px 0;
        }

        .coupon-input {
          flex: 1;
          border: 1px solid #ddd;
          border-radius: 9px;
          padding: 12px;
          outline: none;
        }

        .coupon-btn {
          border: none;
          background: #333;
          color: white;
          border-radius: 9px;
          padding: 0 17px;
          cursor: pointer;
          font-weight: 600;
        }

        .coupon-btn:hover {
          background: #b64b70;
        }

        .coupon-message {
          font-size: 13px;
          margin-top: -12px;
          margin-bottom: 15px;
          color: #777;
        }

        /* TOTALS */

        .price-row {
          display: flex;
          justify-content: space-between;
          margin: 12px 0;
          color: #666;
          font-size: 14px;
        }

        .discount-row {
          color: #2e9d55;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #eee;
          padding-top: 17px;
          margin-top: 17px;
          font-size: 20px;
          font-weight: bold;
          color: #333;
        }

        /* PLACE ORDER */

        .place-order-btn {
          width: 100%;
          border: none;
          background: #b64b70;
          color: white;
          padding: 15px;
          border-radius: 11px;
          margin-top: 22px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.2s;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .place-order-btn:hover {
          background: #963b5b;
          transform: translateY(-1px);
        }

        .secure-payment {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          color: #888;
          font-size: 12px;
          margin-top: 15px;
        }

        /* GIFT MESSAGE */

        .gift-message {
          display: flex;
          gap: 10px;
          align-items: center;
          background: #fff7df;
          border-radius: 11px;
          padding: 13px;
          color: #755c20;
          font-size: 13px;
        }

        /* RESPONSIVE */

        @media (max-width: 900px) {

          .checkout-container {
            grid-template-columns: 1fr;
          }

          .summary-card {
            position: static;
          }

        }

        @media (max-width: 600px) {

          .checkout-page {
            padding: 25px 15px;
          }

          .checkout-title h1 {
            font-size: 27px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .full-width {
            grid-column: auto;
          }

          .delivery-options {
            grid-template-columns: 1fr;
          }

          .checkout-card {
            padding: 18px;
          }

        }

      `}</style>

      <div className="checkout-page">

        {/* HEADER */}

        <div className="checkout-header">

          <button
            className="back-btn"
            onClick={() => navigate("/Cart")}
          >
            <ArrowLeft size={17} />
            Back to Cart
          </button>

          <div className="checkout-title">
            <ShoppingBag size={32} color="#b64b70" />
            <h1>Checkout</h1>
          </div>

          <p className="checkout-subtitle">
            Complete your details and place your flower order 🌸
          </p>

        </div>

        <form onSubmit={handlePlaceOrder}>

          <div className="checkout-container">

            {/* LEFT SIDE */}

            <div>

              {/* DELIVERY DETAILS */}

              <div className="checkout-card">

                <div className="card-title">
                  <MapPin size={22} color="#b64b70" />
                  <h2>Delivery Details</h2>
                </div>

                <div className="form-grid">

                  <div className="input-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile number"
                      maxLength="10"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="6-digit pincode"
                      maxLength="6"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group full-width">
                    <label>Complete Address *</label>
                    <textarea
                      name="address"
                      placeholder="House no., street, area..."
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="input-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>

                </div>

              </div>

              {/* DELIVERY OPTIONS */}

              <div className="checkout-card">

                <div className="card-title">
                  <Truck size={22} color="#b64b70" />
                  <h2>Delivery Options</h2>
                </div>

                <div className="delivery-options">

                  <div
                    className={`option-box ${
                      delivery === "standard" ? "active" : ""
                    }`}
                    onClick={() => setDelivery("standard")}
                  >

                    <div className="option-top">

                      <div className="option-left">
                        <input
                          type="radio"
                          checked={delivery === "standard"}
                          onChange={() => setDelivery("standard")}
                        />

                        <strong>Standard Delivery</strong>
                      </div>

                      <span className="option-price">
                        {subtotal >= 999 ? "FREE" : "₹49"}
                      </span>

                    </div>

                    <small>
                      Delivery in 3–5 business days
                    </small>

                  </div>

                  <div
                    className={`option-box ${
                      delivery === "express" ? "active" : ""
                    }`}
                    onClick={() => setDelivery("express")}
                  >

                    <div className="option-top">

                      <div className="option-left">
                        <input
                          type="radio"
                          checked={delivery === "express"}
                          onChange={() => setDelivery("express")}
                        />

                        <strong>Express Delivery</strong>
                      </div>

                      <span className="option-price">
                        ₹99
                      </span>

                    </div>

                    <small>
                      Delivery within 1–2 business days
                    </small>

                  </div>

                </div>

              </div>

              {/* PAYMENT */}

              <div className="checkout-card">

                <div className="card-title">
                  <CreditCard size={22} color="#b64b70" />
                  <h2>Payment Method</h2>
                </div>

                <div className="payment-options">

                  <label
                    className={`payment-option ${
                      payment === "upi" ? "active" : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="payment"
                      checked={payment === "upi"}
                      onChange={() => setPayment("upi")}
                    />

                    <div className="payment-icon">
                      <Smartphone size={20} />
                    </div>

                    <div className="payment-text">
                      <strong>UPI</strong>
                      <small>Google Pay, PhonePe, Paytm etc.</small>
                    </div>

                  </label>

                  <label
                    className={`payment-option ${
                      payment === "card" ? "active" : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="payment"
                      checked={payment === "card"}
                      onChange={() => setPayment("card")}
                    />

                    <div className="payment-icon">
                      <CreditCard size={20} />
                    </div>

                    <div className="payment-text">
                      <strong>Credit / Debit Card</strong>
                      <small>Secure online payment</small>
                    </div>

                  </label>

                  <label
                    className={`payment-option ${
                      payment === "cod" ? "active" : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="payment"
                      checked={payment === "cod"}
                      onChange={() => setPayment("cod")}
                    />

                    <div className="payment-icon">
                      <Banknote size={20} />
                    </div>

                    <div className="payment-text">
                      <strong>Cash on Delivery</strong>
                      <small>Pay when your flowers arrive</small>
                    </div>

                  </label>

                </div>

              </div>

              {/* GIFT MESSAGE */}

              <div className="checkout-card">

                <div className="gift-message">
                  <Gift size={20} />

                  <span>
                    Make someone's day special! Your flowers will be
                    carefully packed with love. 🌷
                  </span>
                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}

            <div>

              <div className="checkout-card summary-card">

                <div className="card-title">
                  <ShoppingBag size={22} color="#b64b70" />
                  <h2>Order Summary</h2>
                </div>

                {/* PRODUCTS */}

              {cartItems.map((item) => (
                  <div
                    className="product-item"
                    key={item.product._id}
                  >

                    <img
                      src={item.product.image}
                      alt={item.product.name}
                    />

                    <div className="product-info">

                      <h4>{item.product.name}</h4>

                      <p>
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <div className="product-price">
                      ₹{item.product.price * item.quantity}
                    </div>

                  </div>
                ))}

                {/* COUPON */}

                <div className="card-title">
                  <Tag size={20} color="#b64b70" />
                  <h2>Apply Coupon</h2>
                </div>

                            <button
              type="button"
              onClick={generateCoupon}
              disabled={subtotal < 500 || generatingCoupon}
              className={`mb-3 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
                subtotal >= 500
                  ? "bg-[#d95c91] text-white hover:bg-[#c84f82]"
                  : "cursor-not-allowed bg-gray-200 text-gray-500"
              }`}
            >
              {generatingCoupon
                ? "Generating Coupon..."
                : subtotal >= 500
                ? "🎁 Get My Coupon"
                : "🔒 Coupon available above ₹500"}
            </button>

               <div className="coupon-box">

                  <input 
                    className="coupon-input" 
                    type="text" 
                    placeholder="Enter coupon" 
                    value={coupon} 
                    onChange={(e) => 
                      setCoupon(e.target.value.toUpperCase()) 
                    } 
                  />

                  <button 
                    type="button" 
                    className="coupon-btn" 
                    onClick={applyCoupon} 
                  >
                    Apply 
                  </button>

                </div>

                {couponMessage && ( 
                  <div className="coupon-message"> 
                    {couponMessage} 
                  </div> 
                )}

                <div className="price-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="price-row">
                  <span>Delivery</span>
                  <span>
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="price-row discount-row">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="total-row">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <button
                type="submit"
                className="place-order-btn"
                disabled={placingOrder}
              >
                <Lock size={17} />

                {placingOrder
                  ? "Placing Order..."
                  : `Place Order • ₹${total}`}
              </button>

                <div className="secure-payment">
                  <Lock size={13} />
                  Your information is secure & protected
                </div>

              </div>

            </div>

          </div>

             </form>

        {/* COUPON POPUP */}
        {showCouponPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">

              <div className="mb-4 text-4xl">
                🎉
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                Your Coupon is Ready!
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Use this code to get 20% OFF on your order.
              </p>

              <div className="my-5 rounded-xl border-2 border-dashed border-[#d95c91] bg-pink-50 px-4 py-4">
                <p className="text-xs font-medium text-gray-500">
                  YOUR COUPON CODE
                </p>

                <p className="mt-1 text-2xl font-bold tracking-widest text-[#d95c91]">
                  {generatedCoupon}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCoupon(generatedCoupon);
                  setShowCouponPopup(false);
                }}
                className="w-full rounded-xl bg-[#d95c91] px-4 py-3 font-semibold text-white hover:bg-[#c84f82]"
              >
                Use This Coupon
              </button>

              <button
                type="button"
                onClick={() => setShowCouponPopup(false)}
                className="mt-2 w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>

            </div>
          </div>
        )}

      </div>
    </>
  );
} 

export default Checkout;

