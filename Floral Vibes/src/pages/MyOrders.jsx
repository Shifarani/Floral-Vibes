import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Package,
  Truck,
  XCircle,
  CalendarDays,
  MapPin,
  ShoppingBag,
  Clock3,
} from "lucide-react";
import axiosInstance from "../axiosInstance";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingOrder, setCancellingOrder] = useState(null);

  const orderStatuses = [
    "Placed",
    "Confirmed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const getStatusIndex = (status) => {
    const statusMap = {
      "Order Placed": 0,
      Placed: 0,
      Confirmed: 1,
      Processing: 2,
      Shipped: 3,
      "Out for Delivery": 4,
      Delivered: 5,
    };

    return statusMap[status] ?? 0;
  };

  // ---------------------------------------
  // FETCH ORDERS
  // ---------------------------------------

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/Login");
      return;
    }

    try {
      const response = await axiosInstance.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setOrders(response.data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [navigate]);

  // ---------------------------------------
  // CANCEL ORDER
  // ---------------------------------------

  const cancelOrder = async (orderId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/Login");
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      setCancellingOrder(orderId);

      const response = await axiosInstance.put(
        `/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Order cancelled successfully ❌");

        await fetchOrders();
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to cancel order"
      );
    } finally {
      setCancellingOrder(null);
    }
  };

  // ---------------------------------------
  // LOADING
  // ---------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffafc]">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-[#fde8f0]">
            <Package
              size={30}
              className="text-[#d95c91]"
            />
          </div>

          <p className="mt-4 animate-pulse font-semibold text-[#d95c91]">
            Loading your orders... 🌸
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------------------
  // MAIN UI
  // ---------------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8fb] via-white to-[#fffafc] px-4 py-10">

      <div className="mx-auto max-w-6xl">

        {/* PAGE HEADER */}
        <div className="mb-10 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f9d5e3] to-[#fff0f5] shadow-sm">
            <ShoppingBag
              size={30}
              className="text-[#d95c91]"
            />
          </div>

          <h1 className="text-3xl font-bold text-[#3d3035] sm:text-4xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Track your beautiful flower orders 🌷
          </p>

        </div>

        {/* EMPTY ORDERS */}
        {orders.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-3xl border border-[#f5dfe7] bg-white p-10 text-center shadow-[0_15px_50px_rgba(217,92,145,0.08)]">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fff0f5]">
              <ShoppingBag
                size={36}
                className="text-[#d95c91]"
              />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-700">
              No orders yet 🌸
            </h2>

            <p className="mt-2 text-gray-500">
              Your beautiful flower orders will appear here.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-7 rounded-full bg-[#d95c91] px-7 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#c84f82] hover:shadow-lg"
            >
              Continue Shopping
            </button>

          </div>
        ) : (
          <div className="space-y-8">

            {orders.map((order, orderIndex) => {

              const currentIndex = getStatusIndex(
                order.orderStatus
              );

              const isCancelled =
                order.orderStatus === "Cancelled";

              const canCancel = [
                "Placed",
                "Confirmed",
                "Processing",
              ].includes(order.orderStatus);

              return (
                <div
                  key={order._id}
                  className="group overflow-hidden rounded-3xl border border-[#f4e1e8] bg-white shadow-[0_12px_45px_rgba(217,92,145,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(217,92,145,0.14)]"
                  style={{
                    animation: `fadeUp 0.5s ease-out ${
                      orderIndex * 0.12
                    }s both`,
                  }}
                >

                  {/* TOP HEADER */}
                  <div className="border-b border-[#f5e8ed] bg-gradient-to-r from-[#fff4f8] via-white to-[#fff8fb] px-5 py-5 sm:px-7">

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#b07b8b]">
                          Order ID
                        </p>

                        <p className="mt-1 break-all text-sm font-bold text-[#4a3b40]">
                          #{order._id}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#b07b8b]">
                          Order Date
                        </p>

                        <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-700">
                          <CalendarDays
                            size={15}
                            className="text-[#d95c91]"
                          />

                          {new Date(
                            order.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                          })}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#b07b8b]">
                          Status
                        </p>

                        <span
                          className={`mt-1 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold ${
                            isCancelled
                              ? "bg-red-50 text-red-600"
                              : order.orderStatus ===
                                "Delivered"
                              ? "bg-green-50 text-green-600"
                              : "bg-pink-50 text-[#d95c91]"
                          }`}
                        >
                          {isCancelled ? (
                            <XCircle size={14} />
                          ) : (
                            <span className="h-2 w-2 animate-pulse rounded-full bg-current" />
                          )}

                          {order.orderStatus}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* CANCELLED ORDER */}
                  {isCancelled ? (
                    <div className="mx-5 mt-6 rounded-2xl border border-red-100 bg-gradient-to-r from-red-50 to-rose-50 p-5 sm:mx-7">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
                          <XCircle
                            size={23}
                            className="text-red-500"
                          />
                        </div>

                        <div>
                          <h3 className="font-bold text-red-600">
                            Order Cancelled
                          </h3>

                          <p className="mt-1 text-sm text-red-500">
                            This order has been successfully cancelled.
                          </p>
                        </div>

                      </div>

                    </div>
                  ) : (
                    <>
                      {/* TRACKING */}
                      <div className="mx-5 mt-6 rounded-3xl bg-gradient-to-br from-[#fff8fb] to-[#fffdfd] p-5 sm:mx-7 sm:p-7">

                        <div className="mb-7 flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fde8f0]">
                            <Truck
                              size={20}
                              className="text-[#d95c91]"
                            />
                          </div>

                          <div>
                            <h3 className="font-bold text-[#403338]">
                              Order Tracking
                            </h3>

                            <p className="text-xs text-gray-400">
                              Your order journey 🌷
                            </p>
                          </div>

                        </div>

                        {/* DESKTOP TIMELINE */}
                        <div className="hidden md:flex">

                          {orderStatuses.map(
                            (status, index) => {

                              const completed =
                                index <= currentIndex;

                              const active =
                                index === currentIndex;

                              return (
                                <div
                                  key={status}
                                  className="relative flex flex-1 flex-col items-center"
                                >

                                  {/* CONNECTING LINE */}
                                  {index <
                                    orderStatuses.length -
                                      1 && (
                                    <div
                                      className={`absolute left-1/2 top-5 h-1 w-full ${
                                        index <
                                        currentIndex
                                          ? "bg-[#d95c91]"
                                          : "bg-gray-200"
                                      }`}
                                    />
                                  )}

                                  {/* CIRCLE */}
                                  <div
                                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                                      completed
                                        ? "border-[#d95c91] bg-[#d95c91] text-white shadow-md"
                                        : "border-gray-200 bg-white text-gray-300"
                                    } ${
                                      active
                                        ? "scale-125 shadow-[0_0_0_7px_rgba(217,92,145,0.10)]"
                                        : ""
                                    }`}
                                  >
                                    {completed ? (
                                      <Check
                                        size={18}
                                        strokeWidth={3}
                                      />
                                    ) : (
                                      <Package
                                        size={16}
                                      />
                                    )}
                                  </div>

                                  <p
                                    className={`mt-3 max-w-[95px] text-center text-[10px] font-semibold leading-tight sm:text-xs ${
                                      completed
                                        ? "text-[#d95c91]"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    {status}
                                  </p>

                                </div>
                              );
                            }
                          )}

                        </div>

                        {/* MOBILE TIMELINE */}
                        <div className="space-y-4 md:hidden">

                          {orderStatuses.map(
                            (status, index) => {

                              const completed =
                                index <= currentIndex;

                              return (
                                <div
                                  key={status}
                                  className="flex items-center gap-3"
                                >

                                  <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                                      completed
                                        ? "border-[#d95c91] bg-[#d95c91] text-white"
                                        : "border-gray-200 bg-white text-gray-300"
                                    }`}
                                  >
                                    {completed ? (
                                      <Check
                                        size={16}
                                      />
                                    ) : (
                                      <Package
                                        size={15}
                                      />
                                    )}
                                  </div>

                                  <p
                                    className={`text-sm font-semibold ${
                                      completed
                                        ? "text-[#d95c91]"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    {status}
                                  </p>

                                </div>
                              );
                            }
                          )}

                        </div>

                      </div>

                      {/* DELIVERY INFO */}
                      {order.expectedDeliveryDate && (
                        <div className="mx-5 mt-4 grid gap-4 sm:mx-7 sm:grid-cols-2">

                          <div className="rounded-2xl border border-[#f5dce5] bg-[#fff8fb] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fde8f0]">
                                <CalendarDays
                                  size={19}
                                  className="text-[#d95c91]"
                                />
                              </div>

                              <div>
                                <p className="text-xs text-gray-400">
                                  Expected Delivery
                                </p>

                                <p className="mt-1 font-bold text-[#d95c91]">
                                  {new Date(
                                    order.expectedDeliveryDate
                                  ).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    }
                                  )}
                                </p>
                              </div>

                            </div>

                          </div>

                          <div className="rounded-2xl border border-[#f5dce5] bg-[#fff8fb] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fde8f0]">
                                <Clock3
                                  size={19}
                                  className="text-[#d95c91]"
                                />
                              </div>

                              <div>
                                <p className="text-xs text-gray-400">
                                  Delivery
                                </p>

                          <p className="mt-1 font-bold text-gray-700">
                            {(() => {
                              const now = new Date();
                              const delivery = new Date(order.expectedDeliveryDate);

                              const diffMinutes = Math.max(
                                0,
                                Math.round((delivery - now) / (1000 * 60))
                              );

                              if (diffMinutes < 60) {
                                return `${diffMinutes} Minutes`;
                              }

                              const hours = Math.floor(diffMinutes / 60);
                              const minutes = diffMinutes % 60;

                              if (hours < 24) {
                                return minutes > 0
                                  ? `${hours} Hour ${minutes} Min`
                                  : `${hours} Hour`;
                              }

                              return "Within 1 Day";
                            })()}
                          </p>
                              </div>

                            </div>

                          </div>

                        </div>
                      )}

                    </>
                  )}

                  {/* PRODUCTS */}
                  <div className="px-5 pt-7 sm:px-7">

                    <div className="mb-4 flex items-center gap-2">
                      <ShoppingBag
                        size={18}
                        className="text-[#d95c91]"
                      />

                      <h3 className="font-bold text-gray-800">
                        Ordered Items
                      </h3>
                    </div>

                    <div className="space-y-4">

                      {order.items.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="flex gap-4 rounded-2xl border border-[#f5e8ed] bg-[#fffdfd] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                          >

                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-20 w-20 shrink-0 rounded-xl object-cover"
                            />

                            <div className="min-w-0 flex-1">

                              <h3 className="truncate font-semibold text-gray-800">
                                {item.name}
                              </h3>

                              <p className="mt-1 text-sm text-gray-500">
                                Quantity:{" "}
                                {item.quantity}
                              </p>

                              <p className="text-sm text-gray-500">
                                ₹{item.price} each
                              </p>

                            </div>

                            <div className="text-right">
                              <p className="font-bold text-gray-800">
                                ₹
                                {item.price *
                                  item.quantity}
                              </p>
                            </div>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                  {/* SHIPPING ADDRESS */}
                  {order.shippingAddress && (
                    <div className="mx-5 mt-6 rounded-2xl bg-[#fff8fb] p-4 sm:mx-7">

                      <div className="flex gap-3">

                        <MapPin
                          size={19}
                          className="mt-1 shrink-0 text-[#d95c91]"
                        />

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-[#b07b8b]">
                            Delivery Address
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-700">
                            {order.shippingAddress.fullName}
                          </p>

                          <p className="text-sm text-gray-500">
                            {order.shippingAddress.address},{" "}
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state} -{" "}
                            {order.shippingAddress.pincode}
                          </p>

                        </div>

                      </div>

                    </div>
                  )}

                  {/* CANCEL BUTTON */}
                  {canCancel && (
                    <div className="flex justify-end px-5 pt-5 sm:px-7">

                      <button
                        onClick={() =>
                          cancelOrder(order._id)
                        }
                        disabled={
                          cancellingOrder ===
                          order._id
                        }
                        className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-100 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {cancellingOrder ===
                        order._id ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-red-600" />
                            Cancelling...
                          </>
                        ) : (
                          <>
                            <XCircle size={17} />
                            Cancel Order
                          </>
                        )}
                      </button>

                    </div>
                  )}

                  {/* FOOTER */}
                  <div className="mt-6 flex flex-col gap-5 border-t border-[#f5e8ed] bg-[#fffdfd] px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">

                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Payment Method
                      </p>

                      <p className="mt-1 font-semibold text-gray-700">
                        {order.paymentMethod}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Total Amount
                      </p>

                      <p className="mt-1 text-2xl font-bold text-[#d95c91]">
                        ₹{order.totalAmount}
                      </p>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </div>
  );
}

export default MyOrders;