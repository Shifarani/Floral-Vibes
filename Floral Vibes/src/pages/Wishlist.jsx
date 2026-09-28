import React, { useState,useEffect } from "react";
import axiosInstance from "../axiosInstance";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Flower2,
} from "lucide-react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setWishlist(response.data.wishlist.products || []);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchWishlist();
}, []);

  const removeFromWishlist = async (productId) => {
  const token = localStorage.getItem("token");

  if (!productId) {
    alert("Product ID missing");
    return;
  }

  try {
    const response = await axiosInstance.delete("/wishlist/remove", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        productId: productId,
      },
    });

    if (response.data.success) {
      setWishlist(response.data.wishlist.products || []);
      alert("Product removed from wishlist ❤️");
    }
  } catch (error) {
    console.error("Remove wishlist error:", error);

    alert(
      error.response?.data?.message ||
        "Failed to remove product"
    );
  }
};
  const addToCart = (item) => {
    alert(`${item.name} added to cart 🛒🌸`);
  };

  return (
    <div className="min-h-screen bg-[#fffafc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f6]">
            <Heart
              size={30}
              className="fill-[#d95c91] text-[#d95c91]"
            />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d95c91]">
            Your Favourite Flowers
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#3d3035] sm:text-4xl">
            My Wishlist
          </h1>

          <p className="mt-3 text-sm text-[#75666c]">
            Save your favourite flowers and find them whenever you want.
          </p>
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <div className="rounded-3xl border border-[#f3dfe8] bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fff0f6]">
              <Flower2
                size={38}
                className="text-[#d95c91]"
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#49363e]">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-sm text-[#806f76]">
              Start adding flowers that you love.
            </p>

            <a
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#d95c91] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#c84f82] hover:shadow-lg"
            >
              Explore Flowers
              <ArrowRight size={17} />
            </a>
          </div>
        ) : (

          /* Wishlist Products */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {wishlist.map((item) => (
              <div
                key={item._id}
                className="group overflow-hidden rounded-3xl border border-[#f3dfe8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-[#fff5f8]">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={() =>
                      removeFromWishlist(item._id)
                    }
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-[#fff0f6]"
                    title="Remove from wishlist"
                  >
                    <Heart
                      size={19}
                      className="fill-[#d95c91] text-[#d95c91]"
                    />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-5">

                  <p className="text-xs font-medium uppercase tracking-wider text-[#d95c91]">
                    Floral Vibes
                  </p>

                  <h2 className="mt-2 text-lg font-bold text-[#49363e]">
                    {item.name}
                  </h2>

                  <div className="mt-4 flex items-center justify-between">

                    <p className="text-xl font-bold text-[#d95c91]">
                      ₹{item.price}
                    </p>

                    <button
                      onClick={() => addToCart(item)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0f6] text-[#d95c91] transition hover:bg-[#d95c91] hover:text-white"
                      title="Add to cart"
                    >
                      <ShoppingCart size={18} />
                    </button>

                  </div>

                  <button
                    onClick={() =>
                      removeFromWishlist(item._id)
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#ead7e0] py-2.5 text-sm font-semibold text-[#75666c] transition hover:border-[#d95c91] hover:bg-[#fff5f8] hover:text-[#d95c91]"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* Bottom CTA */}
        {wishlist.length > 0 && (
          <div className="mt-12 rounded-3xl bg-[#fff0f6] px-6 py-10 text-center">

            <Heart
              size={25}
              className="mx-auto fill-[#d95c91] text-[#d95c91]"
            />

            <h2 className="mt-3 text-2xl font-bold text-[#49363e]">
              Found something you love?
            </h2>

            <p className="mt-2 text-sm text-[#806f76]">
              Explore more beautiful flowers from Floral Vibes.
            </p>

            <a
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d95c91] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#c84f82] hover:shadow-lg"
            >
              Continue Shopping
              <ArrowRight size={17} />
            </a>

          </div>
        )}

      </div>
    </div>
  );
}

export default Wishlist;