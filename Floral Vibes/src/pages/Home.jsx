import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import {
  ArrowRight,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  Headphones,
  Leaf,
} from "lucide-react";

import backgroundImage from "../assets/images/background image.png";

import flower1 from "../assets/images/images (1).jpg";
import flower2 from "../assets/images/images (2).jpg";
import flower3 from "../assets/images/images (3).jpg";
import flower4 from "../assets/images/images (4).jpg";
import flower5 from "../assets/images/images (5).jpg";
import flower6 from "../assets/images/images (6).jpg";
import flower7 from "../assets/images/images (7).jpg";
import flower8 from "../assets/images/images (8).jpg";
import flower9 from "../assets/images/images (9).jpg";
import flower10 from "../assets/images/images (10).jpg";
import flower11 from "../assets/images/images (11).jpg";
import flower12 from "../assets/images/images (12).jpg";
import flower13 from "../assets/images/images (13).jpg";
import flower14 from "../assets/images/images (14).jpg";
import flower15 from "../assets/images/images (15).jpg";
import flower16 from "../assets/images/images (16).jpg";
import flower17 from "../assets/images/images (17).jpg";
import flower18 from "../assets/images/images (18).jpg";
import flower19 from "../assets/images/images (19).jpg";
import flower20 from "../assets/images/images (20).jpg";
import flower21 from "../assets/images/images (21).jpg";
import flower22 from "../assets/images/images (22).jpg";
import flower23 from "../assets/images/images (23).jpg";
import flower24 from "../assets/images/images (24).jpg";
import flower25 from "../assets/images/images (25).jpg";
import flower26 from "../assets/images/images (26).jpg";
import flower27 from "../assets/images/images (27).jpg";
import flower28 from "../assets/images/images (28).jpg";
import flower29 from "../assets/images/images (29).jpg";
import flower30 from "../assets/images/images (30).jpg";
import flower31 from "../assets/images/images (31).jpg";
import flower32 from "../assets/images/images (32).jpg";



function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(null);
  const [cartLoading, setCartLoading] = useState(null);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products || data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

    const addToWishlist = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first ❤️");
      return;
    }

    try {
      setWishlistLoading(productId);

      const response = await axiosInstance.post(
        "/wishlist/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Product added to wishlist ❤️");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add product to wishlist"
      );
    } finally {
      setWishlistLoading(null);
    }
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first 🛒");
      return;
    }

    try {
      setCartLoading(productId);

      const response = await axiosInstance.post(
        "/cart/add",
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Product added to cart 🛒🌸");

        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add product to cart"
      );
    } finally {
      setCartLoading(null);
    }
  };

  const categories = [
    {
      name: "Roses",
      image: flower1,
      color: "#fff0f4",
    },
    {
      name: "Mixed Flowers",
      image: flower2,
      color: "#fff5e9",
    },
    {
      name: "Sunflowers",
      image: flower3,
      color: "#fff9dc",
    },
    {
      name: "Tulips",
      image: flower4,
      color: "#f7edff",
    },
    {
      name: "Delight Flowers",
      image: flower5,
      color: "#edf9e9",
    },
  ];

  return (
    <>
      <style>{`

        /* =========================================
           HOME PAGE
        ========================================= */

        * {
          box-sizing: border-box;
        }

        .home-page {
          width: 100%;
          background: #ffffff;
          color: #26332f;
          overflow: hidden;
        }


        /* =========================================
           HERO SECTION
        ========================================= */

        .hero {
          min-height: 570px;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;

          background-image:
            linear-gradient(
              90deg,
              rgba(255, 246, 248, 0.97) 0%,
              rgba(255, 246, 248, 0.90) 38%,
              rgba(255, 246, 248, 0.20) 72%,
              rgba(255, 246, 248, 0.05) 100%
            ),
            url("${backgroundImage}");

          background-size: cover;
          background-position: center;
        }

        .hero-content {
          width: 48%;
          max-width: 650px;
          padding: 65px 0 65px 7%;
          position: relative;
          z-index: 2;
        }

        .hero-tag {
          color: #b33f5d;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 13px;
        }

        .hero-title {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(43px, 5vw, 67px);
          line-height: 1.05;
          color: #16352e;
          font-weight: 700;
        }

        .hero-title span {
          display: block;
          color: #e83e71;
          font-family: Georgia, "Times New Roman", serif;
          font-style: italic;
          font-weight: 500;
        }

        .hero-description {
          max-width: 500px;
          margin: 22px 0 28px;
          color: #5e6865;
          font-size: 15px;
          line-height: 1.75;
        }

        .hero-buttons {
          display: flex;
          gap: 13px;
          flex-wrap: wrap;
        }

        .shop-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          padding: 13px 23px;
          border-radius: 30px;
          background: #ec3d70;
          color: white;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 7px 20px rgba(236, 61, 112, 0.20);
          transition: 0.3s;
        }

        .shop-btn:hover {
          background: #d72d5e;
          transform: translateY(-2px);
        }

        .outline-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          padding: 12px 22px;
          border: 1px solid #dca3b4;
          border-radius: 30px;
          color: #273a35;
          background: rgba(255,255,255,0.7);
          font-size: 13px;
          font-weight: 600;
          transition: 0.3s;
        }

        .outline-btn:hover {
          border-color: #e83e71;
          color: #e83e71;
        }


        /* =========================================
           SERVICE FEATURES
        ========================================= */

        .features {
          min-height: 92px;
          padding: 18px 7%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: #ffffff;
          border-bottom: 1px solid #f0e5e7;
        }

        .feature {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border-right: 1px solid #e8e0e1;
        }

        .feature:last-child {
          border-right: none;
        }

        .feature-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #fff1f5;
          color: #e83e71;
        }

        .feature h4 {
          margin: 0 0 3px;
          font-size: 12px;
          color: #26332f;
        }

        .feature p {
          margin: 0;
          font-size: 10px;
          color: #89908d;
        }


        /* =========================================
           SECTION COMMON
        ========================================= */

        .section {
          padding: 55px 7%;
        }

        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 25px;
        }

        .section-title-box h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 29px;
          color: #24332e;
        }

        .section-title-box h2::after {
          content: "";
          display: block;
          width: 35px;
          height: 3px;
          background: #ed3f71;
          margin-top: 8px;
          border-radius: 5px;
        }

        .section-title-box p {
          margin: 9px 0 0;
          color: #89908d;
          font-size: 12px;
        }

        .view-all {
          text-decoration: none;
          color: #e33b6b;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 5px;
        }


        /* =========================================
           CATEGORY
        ========================================= */

        .category-section {
          background: #ffffff;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
        }

        .category-card {
          text-decoration: none;
          border-radius: 10px;
          overflow: hidden;
          transition: 0.3s ease;
          border: 1px solid transparent;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(55, 35, 42, 0.10);
        }

        .category-image {
          height: 135px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .category-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.4s;
        }

        .category-card:hover img {
          transform: scale(1.06);
        }

        .category-info {
          padding: 10px 8px 13px;
          text-align: center;
        }

        .category-info h3 {
          margin: 0 0 5px;
          font-family: Georgia, "Times New Roman", serif;
          color: #273631;
          font-size: 15px;
        }

        .category-info span {
          color: #e33b6b;
          font-size: 10px;
          font-weight: 700;
        }


        /* =========================================
           POPULAR PRODUCTS
        ========================================= */

        .popular-section {
          background: #fffafa;
          padding-top: 45px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .product-card {
          background: #ffffff;
          border: 1px solid #f0e5e7;
          border-radius: 8px;
          overflow: hidden;
          transition: 0.3s;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(52, 35, 40, 0.11);
        }

        .product-image {
          height: 220px;
          position: relative;
          overflow: hidden;
          background: #f8eeee;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.5s;
        }

        .product-card:hover .product-image img {
          transform: scale(1.05);
        }

        .heart-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 50%;
          background: rgba(255,255,255,0.95);
          color: #d85a78;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 3px 10px rgba(0,0,0,0.08);
        }

        .heart-btn:hover {
          background: #e83e71;
          color: white;
        }

        .fresh-badge {
          position: absolute;
          left: 10px;
          top: 10px;
          background: #ffffff;
          color: #35a56b;
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 9px;
          font-weight: 700;
        }

        .product-info {
          padding: 13px;
        }

        .product-category {
          color: #d94b6b;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .product-info h3 {
          margin: 6px 0;
          color: #25332e;
          font-size: 14px;
          font-family: Georgia, "Times New Roman", serif;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          color: #777;
        }

        .stars {
          display: flex;
          gap: 1px;
          color: #efa928;
        }

        .product-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 11px;
        }

        .price {
          font-size: 17px;
          color: #26332f;
          font-weight: 800;
        }

        .cart-btn {
          border: none;
          background: #ed3d70;
          color: white;
          padding: 8px 12px;
          border-radius: 5px;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          transition: 0.3s;
        }

        .cart-btn:hover {
          background: #d62e5e;
        }


        /* =========================================
           OCCASION SECTION
        ========================================= */

        .occasion {
          margin: 0 7% 55px;
          min-height: 260px;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;

          background:
            linear-gradient(
              90deg,
              rgba(255, 247, 232, 0.98),
              rgba(255, 247, 232, 0.80),
              rgba(255, 247, 232, 0.15)
            ),
            url("${flower6}");

          background-size: cover;
          background-position: center;
        }

        .occasion-content {
          width: 55%;
          padding: 35px 45px;
          position: relative;
          z-index: 2;
        }

        .occasion-content small {
          color: #b77c48;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .occasion-content h2 {
          margin: 7px 0 10px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 34px;
          line-height: 1.05;
          color: #27342f;
        }

        .occasion-content p {
          color: #6f756f;
          font-size: 11px;
          line-height: 1.6;
          max-width: 360px;
          margin-bottom: 15px;
        }


        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 1100px) {

          .hero-content {
            width: 55%;
          }

          .category-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }


        @media (max-width: 800px) {

          .hero {
            min-height: 560px;
            background-position: 65% center;
          }

          .hero-content {
            width: 70%;
            padding-left: 6%;
          }

          .features {
            grid-template-columns: repeat(2, 1fr);
          }

          .feature {
            padding: 12px;
          }

          .feature:nth-child(2) {
            border-right: none;
          }

          .feature:nth-child(3),
          .feature:nth-child(4) {
            border-top: 1px solid #e8e0e1;
          }

          .category-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .occasion-content {
            width: 65%;
          }

        }


        @media (max-width: 600px) {

          .hero {
            min-height: 620px;

            background-image:
              linear-gradient(
                rgba(255, 246, 248, 0.86),
                rgba(255, 246, 248, 0.88)
              ),
              url("${backgroundImage}");

            background-position: center;
          }

          .hero-content {
            width: 100%;
            padding: 45px 7%;
            text-align: center;
          }

          .hero-title {
            font-size: 43px;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-buttons {
            justify-content: center;
          }

          .features {
            grid-template-columns: 1fr 1fr;
            padding: 10px 4%;
          }

          .feature {
            border-right: none;
          }

          .section {
            padding: 45px 5%;
          }

          .section-header {
            align-items: flex-start;
          }

          .section-title-box h2 {
            font-size: 25px;
          }

          .category-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .category-image {
            height: 145px;
          }

          .product-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .product-image {
            height: 190px;
          }

          .product-info {
            padding: 10px;
          }

          .product-info h3 {
            font-size: 13px;
          }

          .price {
            font-size: 15px;
          }

          .cart-btn {
            padding: 7px 8px;
            font-size: 9px;
          }

          .occasion {
            margin: 0 5% 40px;
            min-height: 310px;
          }

          .occasion-content {
            width: 100%;
            padding: 30px;
          }

          .occasion-content h2 {
            font-size: 29px;
          }

        }


        @media (max-width: 400px) {

          .hero-title {
            font-size: 37px;
          }

          .features {
            grid-template-columns: 1fr;
          }

          .feature {
            border-bottom: 1px solid #eee;
          }

          .category-grid {
            grid-template-columns: 1fr;
          }

          .category-image {
            height: 210px;
          }

          .product-grid {
            grid-template-columns: 1fr;
          }

          .product-image {
            height: 280px;
          }

        }

      `}</style>


      {/* =========================================
          HERO
      ========================================= */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-tag">
            Nature's Beauty, Delivered to You
          </div>

          <h1 className="hero-title">
            Fresh Flowers
            <span>for Every Emotion</span>
          </h1>

          <p className="hero-description">
            Brighten your day with our handpicked fresh flowers.
            From romantic roses to cheerful sunflowers and elegant
            tulips, find the perfect bouquet for every occasion.
          </p>

          <div className="hero-buttons">

            <Link to="/shop" className="shop-btn">
              Shop Now
              <ArrowRight size={16} />
            </Link>

            <Link to="/shop" className="outline-btn">
              Explore Bouquets
            </Link>

          </div>

        </div>

      </section>


      {/* =========================================
          FEATURES
      ========================================= */}

      <section className="features">

        <div className="feature">
          <div className="feature-icon">
            <Leaf size={21} />
          </div>

          <div>
            <h4>Fresh & Natural</h4>
            <p>100% Fresh Flowers</p>
          </div>
        </div>


        <div className="feature">
          <div className="feature-icon">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h4>Secure Payment</h4>
            <p>Safe & Easy Checkout</p>
          </div>
        </div>


        <div className="feature">
          <div className="feature-icon">
            <Truck size={21} />
          </div>

          <div>
            <h4>Fast Delivery</h4>
            <p>On Time, Always</p>
          </div>
        </div>


        <div className="feature">
          <div className="feature-icon">
            <Headphones size={21} />
          </div>

          <div>
            <h4>24/7 Support</h4>
            <p>We're Here to Help</p>
          </div>
        </div>

      </section>


      {/* =========================================
          CATEGORY
      ========================================= */}

      <section className="section category-section">

        <div className="section-header">

          <div className="section-title-box">
            <h2>Shop by Category</h2>
          </div>

          <Link to="/shop" className="view-all">
            View All
            <ArrowRight size={14} />
          </Link>

        </div>


        <div className="category-grid">

          {categories.map((category) => (

            <Link
              to={`/shop?category=${category.name}`}
              className="category-card"
              key={category.name}
              style={{
                background: category.color,
              }}
            >

              <div className="category-image">

                <img
                  src={category.image}
                  alt={category.name}
                />

              </div>

              <div className="category-info">

                <h3>{category.name}</h3>

                <span>
                  Shop Now →
                </span>

              </div>

            </Link>

          ))}

        </div>

      </section>


     

<section className="section popular-section">

  <div className="section-header">

    <div className="section-title-box">
      <h2>Popular Picks</h2>

      <p>
        Handpicked with love for your special moments
      </p>
    </div>

    <Link to="/shop" className="view-all">
      View All
      <ArrowRight size={14} />
    </Link>

  </div>


  <div className="product-grid">

    {loading ? (
      <p>Loading products...</p>
    ) : products.length === 0 ? (
      <p>No products available.</p>
    ) : (
      products.map((product) => (

        <div
          className="product-card"
          key={product._id}
        >

          {/* PRODUCT IMAGE */}

          <div
            className="product-image cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}
          >

            <img
              src={product.image}
              alt={product.name}
            />

            {/* WISHLIST */}

            <button
              type="button"
              className="heart-btn"
              aria-label="Add to wishlist"
              onClick={(e) => {
                e.stopPropagation();
                addToWishlist(product._id);
              }}
              disabled={wishlistLoading === product._id}
            >
              <Heart
                size={17}
                fill={wishlistLoading === product._id ? "currentColor" : "none"}
              />
            </button>

            <span className="fresh-badge">
              Fresh
            </span>

          </div>


          {/* PRODUCT INFO */}

          <div className="product-info">

            <span className="product-category">
              {product.category}
            </span>


            <h3
              className="cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              {product.name}
            </h3>


            {/* RATING */}

            <div className="rating">

              <div className="stars">

                {[1, 2, 3, 4, 5].map((star) => (

                  <Star
                    key={star}
                    size={12}
                    fill="currentColor"
                  />

                ))}

              </div>

              <span>
                {product.rating || 0}
              </span>

              <span>
                ({product.reviews || 0} reviews)
              </span>

            </div>


            {/* PRICE + CART */}

            <div className="product-bottom">

              <span className="price">
                ₹{product.price}
              </span>


              <button
                type="button"
                className="cart-btn"
                onClick={() => addToCart(product._id)}
                disabled={cartLoading === product._id}
              >

                <ShoppingCart size={13} />

                {cartLoading === product._id
                  ? "Adding..."
                  : "Add to Cart"}

              </button>

            </div>

          </div>

        </div>

      ))
    )}

  </div>

</section>
    </>
  );
}

export default Home;