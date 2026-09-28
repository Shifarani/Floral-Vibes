import React, { useState,useEffect } from "react";
import axiosInstance from "../axiosInstance";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Heart,
  Flower2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
 const [cartItems, setCartItems] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
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
      setLoading(false);
    }
  };

  fetchCart();
}, []);

  const increaseQuantity = async (productId, currentQuantity) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.put(
      "/cart/update",
      {
        productId,
        quantity: currentQuantity + 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  if (response.data.success) {
  setCartItems(response.data.cart.items);
  window.dispatchEvent(new Event("cartUpdated"));
}
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Failed to update quantity"
    );
  }
};

const decreaseQuantity = async (productId, currentQuantity) => {
  if (currentQuantity <= 1) return;

  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.put(
      "/cart/update",
      {
        productId,
        quantity: currentQuantity - 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   if (response.data.success) {
  setCartItems(response.data.cart.items);
  window.dispatchEvent(new Event("cartUpdated"));
}
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Failed to update quantity"
    );
  }
};
 
 const removeItem = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.delete(
      "/cart/remove",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          productId,
        },
      }
    );

   if (response.data.success) {
  setCartItems(response.data.cart.items);
  window.dispatchEvent(new Event("cartUpdated"));
}
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Failed to remove product"
    );
  }
};

const subtotal = cartItems.reduce(
  (total, item) =>
    total + item.product.price * item.quantity,
  0
);
  

  const delivery = subtotal > 0 ? 49 : 0;
  const total = subtotal + delivery;

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffafc]">
      <p className="text-[#d95c91] font-semibold">
        Loading cart...
      </p>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#fffafc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f6]">
            <ShoppingCart
              size={30}
              className="text-[#d95c91]"
            />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d95c91]">
            Your Shopping Bag
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#3d3035] sm:text-4xl">
            My Cart
          </h1>

          <p className="mt-3 text-sm text-[#75666c]">
            Review your beautiful flower choices before checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="rounded-3xl border border-[#f3dfe8] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fff0f6]">
              <Flower2
                size={38}
                className="text-[#d95c91]"
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#49363e]">
              Your cart is empty
            </h2>

            <p className="mt-2 text-sm text-[#806f76]">
              Looks like you haven't added any flowers yet.
            </p>

            <a
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#d95c91] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#c84f82]"
            >
              Continue Shopping
              <ArrowRight size={17} />
            </a>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* Cart Items */}
            <div className="space-y-5">

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="rounded-3xl border border-[#f3dfe8] bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                    {/* Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-36 w-full rounded-2xl object-cover sm:h-32 sm:w-32"
                    />

                    {/* Details */}
                    <div className="flex-1">

                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-bold text-[#49363e]">
                            {item.product.name}
                          </h2>

                          <p className="mt-1 text-sm text-[#9a8990]">
                            Fresh flowers • Floral Vibes
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item.product._id)}
                          className="rounded-full p-2 text-[#a39299] transition hover:bg-[#fff0f6] hover:text-[#d95c91]"
                        >
                          <Trash2 size={19} />
                        </button>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

                        {/* Price */}
                        <p className="text-lg font-bold text-[#d95c91]">
                          ₹{item.product.price}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center rounded-full border border-[#ead7e0] bg-[#fffafc]">
                          <button
                            onClick={() =>
                            decreaseQuantity(item.product._id, item.quantity)
                          }
                            className="flex h-9 w-9 items-center justify-center rounded-full text-[#75666c] transition hover:bg-[#f9e3ec] hover:text-[#d95c91]"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="w-8 text-center text-sm font-semibold text-[#49363e]">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.product._id, item.quantity)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full text-[#75666c] transition hover:bg-[#f9e3ec] hover:text-[#d95c91]"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        {/* Total */}
                        <p className="font-bold text-[#49363e]">
                          ₹{item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <a
                href="/shop"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#d95c91] hover:underline"
              >
                <ArrowRight
                  size={16}
                  className="rotate-180"
                />
                Continue Shopping
              </a>
            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-3xl border border-[#f3dfe8] bg-white p-6 shadow-sm sm:p-7">

              <h2 className="text-xl font-bold text-[#49363e]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-sm">
                  <span className="text-[#806f76]">
                    Subtotal
                  </span>

                  <span className="font-semibold text-[#49363e]">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#806f76]">
                    Delivery
                  </span>

                  <span className="font-semibold text-[#49363e]">
                    ₹{delivery}
                  </span>
                </div>

                <div className="border-t border-[#ead7e0] pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#49363e]">
                      Total
                    </span>

                    <span className="text-xl font-bold text-[#d95c91]">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/Checkout")}
                className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d95c91] text-sm font-semibold text-white transition hover:bg-[#c84f82] hover:shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>

              <div className="mt-6 rounded-2xl bg-[#fff5f8] p-4 text-center">
                <Heart
                  size={18}
                  className="mx-auto text-[#d95c91]"
                />

                <p className="mt-2 text-xs leading-5 text-[#806f76]">
                  Every bouquet is packed with love and delivered fresh.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;