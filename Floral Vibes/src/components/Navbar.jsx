import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [cartCount, setCartCount] = useState(0);

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [user, setUser] = useState(null);

  // =========================
  // LOAD USER
  // =========================

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Invalid user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Page load par user check
    loadUser();

    // Login / Logout / Profile update ke baad
    window.addEventListener("userUpdated", loadUser);

    return () => {
      window.removeEventListener("userUpdated", loadUser);
    };
  }, []);

  // =========================
  // FETCH CART COUNT
  // =========================

  useEffect(() => {
    const fetchCartCount = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCartCount(0);
        return;
      }

      try {
        const response = await axiosInstance.get("/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const items = response.data.cart.items || [];

          const count = items.reduce(
            (total, item) => total + item.quantity,
            0
          );

          setCartCount(count);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);

        // Agar token invalid ho gaya ho
        if (error.response?.status === 401) {
          setCartCount(0);
        }
      }
    };

    fetchCartCount();

    // Cart me product add/remove/update hone par
    window.addEventListener("cartUpdated", fetchCartCount);

    return () => {
      window.removeEventListener(
        "cartUpdated",
        fetchCartCount
      );
    };
  }, []);

  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");

        if (response.data.success) {
          setProducts(response.data.products || []);
        }
      } catch (error) {
        console.error(
          "Error fetching products:",
          error
        );
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // SEARCH CATEGORY
  // =========================

  const categories = [
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  const filteredCategories = categories.filter(
    (category) =>
      category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // =========================
  // RETURN
  // =========================

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* =========================
            LOGO
        ========================= */}

        <Link
          to="/"
          className="navbar-logo"
        >
          <div className="logo-icon">
            🌸
          </div>

          <div className="logo-text">
            <h2>Floral Vibes</h2>

            <span>
              Fresh Flowers, Happier Moments
            </span>
          </div>
        </Link>

        {/* =========================
            NAVIGATION LINKS
        ========================= */}

        <nav className="navbar-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/shop">
            Shop
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/blog">
            Blog
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </nav>

        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="navbar-actions">

          {/* =========================
              SEARCH
          ========================= */}

          <div className="search-box relative">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search flowers..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {/* Search Suggestions */}

            {search.trim() && (
              <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[220px] overflow-hidden rounded-2xl border border-[#f3dfe3] bg-white p-2 shadow-xl">

                {filteredCategories.length > 0 ? (

                  filteredCategories.map(
                    (category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          navigate(
                            `/shop?category=${encodeURIComponent(
                              category
                            )}`
                          );

                          setSearch("");
                        }}
                        className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#59484c] transition-all duration-200 hover:bg-[#fff0f4] hover:text-[#d95c91]"
                      >
                        🌸 {category}
                      </button>
                    )
                  )

                ) : (

                  <p className="px-3 py-3 text-sm text-[#9b7d84]">
                    No flower category found 🌸
                  </p>

                )}

              </div>
            )}

          </div>

          {/* =========================
              WISHLIST
          ========================= */}

          <Link
            to="/wishlist"
            className="navbar-icon"
            aria-label="Wishlist"
          >
            <Heart size={21} />
          </Link>

          {/* =========================
              CART
          ========================= */}

          <Link
            to="/cart"
            className="navbar-icon cart-icon"
            aria-label="Cart"
          >
            <ShoppingCart size={21} />

            <span className="cart-count">
              {cartCount}
            </span>
          </Link>

          {/* =========================
              LOGIN / SIGNUP
              OR PROFILE
          ========================= */}

          <div className="auth-buttons">

            {user ? (

              // Logged-in user
              <ProfileDropdown user={user} />

            ) : (

              // Logged-out user
              <>
                <Link
                  to="/login"
                  className="login-btn"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="signup-btn"
                >
                  Sign Up
                </Link>
              </>

            )}

          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;