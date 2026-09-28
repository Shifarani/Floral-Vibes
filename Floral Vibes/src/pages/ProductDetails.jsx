import React, { useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function ProductDetails() {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);

        if (response.data.success) {
          setProduct(response.data.product);
        }
      } catch (error) {
        console.log("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffafc]">
        <p className="text-[#d95c91] font-semibold">
          Loading product... 🌸
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffafc]">
        <p className="text-[#d95c91] font-semibold">
          Product not found 🌸
        </p>
      </div> 
    );
  }

  const increaseQuantity = () => {
  if (quantity < product.stock) {
    setQuantity(quantity + 1);
  }
};
 
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

 const addToCart = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first 🛒");
    return;
  }

  try {
    const response = await axiosInstance.post(
      "/cart/add",
      {
        productId: product._id,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   if (response.data.success) {
  window.dispatchEvent(new Event("cartUpdated"));

  alert(`${quantity} ${product.name} added to cart 🛒🌸`);
}
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Failed to add product to cart"
    );
  }
}; 

  const addToWishlist = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first ❤️");
    return;
  }

  try {
    setWishlistLoading(true);

    const response = await axiosInstance.post(
      "/wishlist/add",
      {
        productId: product._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      setLiked(true);
      alert("Product added to wishlist ❤️");
    }
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Failed to add product to wishlist"
    );
  } finally {
    setWishlistLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#fffafc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-[#8d7b83]">
          <a href="/" className="hover:text-[#d95c91]">
            Home
          </a>

          <span>/</span>

          <a href="/shop" className="hover:text-[#d95c91]">
            Shop
          </a>

          <span>/</span>

          <span className="text-[#d95c91]">
            Product Details
          </span>
        </div>

        {/* Product Section */}
        <div className="grid gap-10 rounded-3xl border border-[#f3dfe8] bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-2 lg:p-10">

          {/* Product Image */}
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-[#fff5f8]">

              <img
                src={product.image}
                alt={product.name}
                className="h-[420px] w-full object-cover sm:h-[520px]"
              />

              {/* Wishlist */}
              <button
                onClick={() => setLiked(!liked)}
                className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-[#fff0f6]"
              >
                <Heart
                  size={22}
                  className={
                    liked
                      ? "fill-[#d95c91] text-[#d95c91]"
                      : "text-[#806f76]"
                  }
                />
              </button>

              {/* Discount */}
             {product.oldPrice > product.price && (
              <div className="absolute left-5 top-5 rounded-full bg-[#d95c91] px-4 py-2 text-xs font-bold text-white">
                {Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100
                )}
                % OFF
              </div>
            )}
            </div>

            {/* Small image placeholder */}
            <div className="mt-4 flex gap-3">
              <div className="h-20 w-20 overflow-hidden rounded-xl border-2 border-[#d95c91]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d95c91]">
              Floral Vibes
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#3d3035] sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-3">

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className="fill-[#f2b84b] text-[#f2b84b]"
                  />
                ))}
              </div>

              <span className="text-sm font-semibold text-[#49363e]">
                {product.rating}
              </span>

              <span className="text-sm text-[#9a8990]">
                ({product.reviews} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-3xl font-bold text-[#d95c91]">
                ₹{product.price}
              </span>

              <span className="text-lg text-[#a39299] line-through">
                ₹{product.oldPrice}
              </span>

              <span className="rounded-full bg-[#fff0f6] px-3 py-1 text-xs font-bold text-[#d95c91]">
                Save ₹{product.oldPrice - product.price}
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-7 text-[#75666c]">
              {product.description}
            </p>

            {/* Divider */}
            <div className="my-7 h-px bg-[#ead7e0]" />

            {/* Quantity */}
            <div>
              <p className="mb-3 text-sm font-semibold text-[#49363e]">
                Quantity
              </p>

              <div className="flex items-center">

                <button
                  onClick={decreaseQuantity}
                  className="flex h-11 w-11 items-center justify-center rounded-l-xl border border-[#ead7e0] bg-[#fffafc] text-[#75666c] hover:bg-[#fff0f6]"
                >
                  <Minus size={17} />
                </button>

                <div className="flex h-11 w-14 items-center justify-center border-y border-[#ead7e0] bg-white text-sm font-bold text-[#49363e]">
                  {quantity}
                </div>

                <button
                  onClick={increaseQuantity}
                  className="flex h-11 w-11 items-center justify-center rounded-r-xl border border-[#ead7e0] bg-[#fffafc] text-[#75666c] hover:bg-[#fff0f6]"
                >
                  <Plus size={17} />
                </button>

              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              <button
                onClick={addToCart}
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#d95c91] text-sm font-semibold text-white transition hover:bg-[#c84f82] hover:shadow-lg"
              >
                <ShoppingCart size={19} />
                Add to Cart
              </button>

              <button
                onClick={addToWishlist}
                disabled={wishlistLoading}
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-[#d95c91] bg-white text-sm font-semibold text-[#d95c91] transition hover:bg-[#fff0f6]"
              >
                <Heart
                  size={19}
                  className={liked ? "fill-[#d95c91]" : ""}
                />
                {wishlistLoading ? "Adding..." : "Add to Wishlist"}
              </button>

            </div>

            {/* Features */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-[#fffafc] p-4 text-center">
                <Truck
                  size={22}
                  className="mx-auto text-[#d95c91]"
                />

                <p className="mt-2 text-xs font-semibold text-[#49363e]">
                  Fast Delivery
                </p>

                <p className="mt-1 text-[11px] text-[#9a8990]">
                  Fresh & Quick
                </p>
              </div>

              <div className="rounded-2xl bg-[#fffafc] p-4 text-center">
                <ShieldCheck
                  size={22}
                  className="mx-auto text-[#d95c91]"
                />

                <p className="mt-2 text-xs font-semibold text-[#49363e]">
                  Secure Payment
                </p>

                <p className="mt-1 text-[11px] text-[#9a8990]">
                  100% Secure
                </p>
              </div>

              <div className="rounded-2xl bg-[#fffafc] p-4 text-center">
                <RotateCcw
                  size={22}
                  className="mx-auto text-[#d95c91]"
                />

                <p className="mt-2 text-xs font-semibold text-[#49363e]">
                  Easy Support
                </p>

                <p className="mt-1 text-[11px] text-[#9a8990]">
                  We're Here
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="mt-10 rounded-3xl border border-[#f3dfe8] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-2xl font-bold text-[#49363e]">
            About This Flower
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#75666c]">
           {product.description}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-[#fff5f8] p-4">
              <p className="text-xs text-[#9a8990]">
                Flower Type
              </p>
              <p className="mt-1 font-semibold text-[#49363e]">
                {product.category}
              </p>
            </div>

            <div className="rounded-2xl bg-[#fff5f8] p-4">
              <p className="text-xs text-[#9a8990]">
                Suitable For
              </p>
              <p className="mt-1 font-semibold text-[#49363e]">
                Gifting
              </p>
            </div>

            <div className="rounded-2xl bg-[#fff5f8] p-4">
              <p className="text-xs text-[#9a8990]">
                Freshness
              </p>
              <p className="mt-1 font-semibold text-[#49363e]">
                Fresh Flowers
              </p>
            </div>

            <div className="rounded-2xl bg-[#fff5f8] p-4">
              <p className="text-xs text-[#9a8990]">
                Delivery
              </p>
              <p className="mt-1 font-semibold text-[#49363e]">
                Available
              </p>
            </div>

          </div>
        </div>

        {/* Back to Shop */}
        <div className="mt-8 text-center">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#d95c91] hover:underline"
          >
            <ArrowRight
              size={16}
              className="rotate-180"
            />
            Back to Shop
          </a>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;