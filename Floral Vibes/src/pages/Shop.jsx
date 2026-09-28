import React, { useEffect,useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import {useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

// ================================
// FLOWER IMAGES
// ================================

// import roseImage from "../assets/images/images (1).jpg";
// import tulipImage from "../assets/images/images (2).jpg";
// import sunflowerImage from "../assets/images/images (3).jpg";
// import pinkRoseImage from "../assets/images/images (4).jpg";
// import lilyImage from "../assets/images/images (5).jpg";
// import mixedImage from "../assets/images/images (6).jpg";
// import pinkTulipImage from "../assets/images/images (7).jpg";
// import freshSunflowerImage from "../assets/images/images (8).jpg";

// ================================
// PRODUCTS
// ================================

// const products = [
//   {
//     id: 1,
//     name: "Red Rose Bouquet",
//     category: "Roses",
//     price: 499,
//     rating: 4.8,
//     image: roseImage,
//   },
//   {
//     id: 2,
//     name: "Beautiful Tulips",
//     category: "Tulips",
//     price: 599,
//     rating: 4.7,
//     image: tulipImage,
//   },
//   {
//     id: 3,
//     name: "Yellow Sunflower",
//     category: "Sunflowers",
//     price: 399,
//     rating: 4.9,
//     image: sunflowerImage,
//   },
//   {
//     id: 4,
//     name: "Pink Rose Bouquet",
//     category: "Roses",
//     price: 549,
//     rating: 4.6,
//     image: pinkRoseImage,
//   },
//   {
//     id: 5,
//     name: "White Lily Bouquet",
//     category: "Lilies",
//     price: 649,
//     rating: 4.8,
//     image: lilyImage,
//   },
//   {
//     id: 6,
//     name: "Mixed Flower Basket",
//     category: "Mixed",
//     price: 799,
//     rating: 4.9,
//     image: mixedImage,
//   },
//   {
//     id: 7,
//     name: "Pink Tulip Bouquet",
//     category: "Tulips",
//     price: 699,
//     rating: 4.7,
//     image: pinkTulipImage,
//   },
//   {
//     id: 8,
//     name: "Fresh Sunflower Bunch",
//     category: "Sunflowers",
//     price: 449,
//     rating: 4.8,
//     image: freshSunflowerImage,
//   },
// ];

// ================================
// SHOP COMPONENT
// ================================

function Shop() {
  const [searchParams] = useSearchParams();

  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");

    if (response.data.success) {
      setProducts(response.data.products);
      console.log("Products from API:", response.data.products);
    }
  } catch (error) {
    console.log("Error fetching products:", error);
  } finally {
    setLoading(false);
  }
};

  fetchProducts();
}, []);

  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("default");
  const [wishlist, setWishlist] = useState([]);

  const categories = [
  "All",
  ...new Set(products.map((product) => product.category).filter(Boolean)),
];

  // ================================
  // WISHLIST
  // ================================

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ================================
  // FILTER
  // ================================

  let filteredProducts =
    category === "All"
      ? products
      : products.filter(
        (product) =>
          product.category?.toLowerCase() === category.toLowerCase()
      ); 

  // ================================
  // SORT
  // ================================

  if (sortBy === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortBy === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating - a.rating
    );
  }

  return (
    <div className="min-h-screen bg-[#fffafc] text-[#3d3035]">

      {/* =================================
          HERO SECTION
      ================================= */}

      <section className="bg-gradient-to-r from-[#fff0f4] via-[#fff8fa] to-[#fff1ea]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">

          <div className="max-w-3xl">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#d94f70] sm:text-sm">
              Fresh • Beautiful • Lovely
            </p>

            <h1 className="text-4xl font-bold leading-tight text-[#38272b] sm:text-5xl lg:text-6xl">
              Shop Fresh Flowers
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#76656b] sm:text-base lg:text-lg">
              Find beautiful flowers and lovely bouquets for every
              special moment.
            </p>

            {/* HERO TAGS */}

            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#5f5055] shadow-sm sm:px-5 sm:text-sm">
                🌷 Fresh Flowers
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#5f5055] shadow-sm sm:px-5 sm:text-sm">
                💐 Beautiful Bouquets
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#5f5055] shadow-sm sm:px-5 sm:text-sm">
                🎁 Perfect Gifts
              </span>

            </div>
          </div>
        </div>
      </section>

      {/* =================================
          SHOP SECTION
      ================================= */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        {/* TITLE */}

        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d94f70] sm:text-sm">
              Our Collection
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#38272b] sm:text-3xl">
              Choose Your Favourite Flowers
            </h2>
          </div>

          <p className="text-sm font-medium text-[#887579]">
            {filteredProducts.length} products
          </p>

        </div>

        {/* =================================
            FILTER + SORT
        ================================= */}

        <div className="mb-9 rounded-2xl border border-[#f3dfe3] bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* FILTER */}

            <div className="flex flex-wrap items-center gap-2">

              <div className="mr-1 flex items-center gap-2 text-sm font-semibold text-[#59484c]">
                <SlidersHorizontal size={17} />
                Filter:
              </div>

              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition duration-200 sm:text-sm ${
                    category === item
                      ? "bg-[#d94f70] text-white shadow-md"
                      : "bg-[#fff4f6] text-[#765b61] hover:bg-[#fde5ea]"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>

            {/* SORT */}

            <div className="flex items-center gap-2">

              <span className="text-sm font-medium text-[#765b61]">
                Sort by:
              </span>

              <div className="relative">

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="cursor-pointer appearance-none rounded-full border border-[#efd9de] bg-[#fffafa] py-2 pl-4 pr-10 text-xs font-medium text-[#59484c] outline-none transition focus:border-[#d94f70] sm:text-sm"
                >
                  <option value="default">Recommended</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#765b61]"
                />

              </div>
            </div>

          </div>
        </div>

        {/* =================================
            PRODUCT GRID
        ================================= */}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => (
              <div
              key={product._id}
              onClick={() => window.location.href = `/product/${product._id}`}
              className="group cursor-pointer overflow-hidden rounded-2xl"
            >

                {/* PRODUCT IMAGE */}

                <div className="relative h-64 overflow-hidden bg-[#fff3f4] sm:h-72">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* BESTSELLER */}

                  {product.rating >= 4.8 && (
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#d94f70] shadow-sm">
                      Bestseller
                    </span>
                  )}

                  {/* WISHLIST */}

                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition duration-200 hover:scale-110"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={19}
                      className={
                        wishlist.includes(product._id)
                          ? "fill-[#d94f70] text-[#d94f70]"
                          : "text-[#59484c]"
                      }
                    />
                  </button>

                </div>

                {/* PRODUCT DETAILS */}

                <div className="p-5">

                  {/* CATEGORY */}

                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#c18491]">
                    {product.category}
                  </p>

                  {/* NAME */}

                  <h3 className="text-lg font-bold text-[#3d3033]">
                    {product.name}
                  </h3>

                  {/* RATING */}

                  <div className="mt-2 flex items-center gap-2">

                    <div className="flex items-center gap-1 rounded-full bg-[#fff7e8] px-2 py-1">

                      <Star
                        size={14}
                        className="fill-[#e7a629] text-[#e7a629]"
                      />

                      <span className="text-xs font-semibold text-[#735d36]">
                        {product.rating}
                      </span>

                    </div>

                    <span className="text-xs text-[#9a898d]">
                      Excellent
                    </span>

                  </div>

                  {/* PRICE + CART */}

                  <div className="mt-5 flex items-end justify-between gap-3">

                    <div>

                      <p className="text-xl font-bold text-[#d94f70]">
                        ₹{product.price}
                      </p>

                      <p className="mt-1 text-xs text-[#a18f93]">
                        Freshly arranged
                      </p>

                    </div>

                    <button
                      className="flex items-center gap-2 rounded-full bg-[#d94f70] px-4 py-2.5 text-xs font-semibold text-white transition duration-200 hover:bg-[#c94062] hover:shadow-md sm:text-sm"
                    >
                      <ShoppingCart size={16} />
                      Add
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        ) : (

          /* =================================
              EMPTY STATE
          ================================= */

          <div className="rounded-2xl bg-white py-20 text-center shadow-sm">

            <div className="text-5xl">
              🌸
            </div>

            <h3 className="mt-4 text-xl font-semibold text-[#3d3033]">
              No flowers found
            </h3>

            <p className="mt-2 text-sm text-[#887579]">
              Try selecting another category.
            </p>

          </div>
        )}

      </section>

      {/* =================================
          BOTTOM CTA
      ================================= */}

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-10">

        <div className="rounded-3xl bg-gradient-to-r from-[#d94f70] to-[#e77991] px-6 py-10 text-center text-white shadow-md sm:px-10">

          <h2 className="text-2xl font-bold sm:text-3xl">
            Send Flowers, Spread Happiness 🌸
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/90 sm:text-base">
            Make someone's day special with a beautiful bouquet
            from Floral Vibes.
          </p>

          <button
          onClick={() => window.location.href = "/explore-flowers"}
          className="mt-6 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#d94f70] transition duration-200 hover:scale-105"
        >
          Explore More Flowers
        </button>
        </div>

      </section>

    </div>
  );
}

export default Shop;