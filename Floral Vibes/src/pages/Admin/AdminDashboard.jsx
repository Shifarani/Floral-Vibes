import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus, Package, ArrowLeft } from "lucide-react";
import axiosInstance from "../../axiosInstance";
function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  // =========================
  // CHECK ADMIN
  // =========================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!token || !user || user.role !== "admin") {
      alert("Access denied. Admin only.");
      navigate("/");
      return;
    }

    fetchProducts();
    fetchOrders();
  }, [navigate]);

  // =========================
  // GET PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");

      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log("Fetch Products Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
// GET ALL ORDERS - ADMIN
// =========================
const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get("/orders/admin/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      setOrders(response.data.orders || []);
    }
  } catch (error) {
    console.log("Fetch Orders Error:", error);

    alert(
      error.response?.data?.message ||
        "Failed to load orders"
    );
  } finally {
    setOrdersLoading(false);
  }
};


// =========================
// UPDATE ORDER STATUS
// =========================
const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.put(
      `/orders/admin/${orderId}/status`,
      {
        orderStatus: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      alert("Order status updated successfully 🌸");

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: newStatus,
              }
            : order
        )
      );
    }
  } catch (error) {
    console.log("Update Order Status Error:", error);

    alert(
      error.response?.data?.message ||
        "Failed to update order status"
    );
  }
};

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.delete(
        `/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Product deleted successfully 🌸");

        setProducts((prevProducts) =>
          prevProducts.filter(
            (product) => product._id !== id
          )
        );
      }
    } catch (error) {
      console.log("Delete Product Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffafc]">
        <p className="text-lg font-medium text-[#d95c91]">
          Loading products...
        </p>
      </div>
    );
  }

  // =========================
  // ADMIN DASHBOARD
  // =========================
  return (
    <div className="min-h-screen bg-[#fffafc] px-4 py-8 sm:px-6 lg:px-10">

      {/* HEADER */}
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-[#3b2b33]">
              Admin Dashboard 🌸
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your Floral Vibes products
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <Link
              to="/"
              className="flex items-center gap-2 rounded-full border border-[#e8cbd7] px-5 py-2.5 text-sm font-medium text-[#6b4b57] transition hover:bg-[#fff0f6]"
            >
              <ArrowLeft size={16} />
              Website
            </Link>

            <Link
              to="/admin/add-product"
              className="flex items-center gap-2 rounded-full bg-[#d95c91] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c84f82]"
            >
              <Plus size={17} />
              Add Product
            </Link>

          </div>

        </div>


        {/* PRODUCT COUNT */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0f6] text-[#d95c91]">
              <Package size={21} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Products
              </p>

              <p className="text-2xl font-bold text-[#3b2b33]">
                {products.length}
              </p>
            </div>

          </div>

        </div>


        {/* PRODUCTS */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="border-b border-[#f2e4e9] px-6 py-5">

            <h2 className="text-xl font-bold text-[#3b2b33]">
              All Products
            </h2>

          </div>


          {products.length === 0 ? (

            <div className="px-6 py-16 text-center">

              <Package
                size={40}
                className="mx-auto mb-3 text-[#d95c91]"
              />

              <p className="text-gray-500">
                No products found.
              </p>

              <Link
                to="/admin/add-product"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#d95c91] px-5 py-2.5 text-sm font-semibold text-white"
              >
                <Plus size={16} />
                Add Your First Product
              </Link>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[800px]">

                <thead className="bg-[#fffafc]">

                  <tr>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Price
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Stock
                    </th>

                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {products.map((product) => (

                    <tr
                      key={product._id}
                      className="border-t border-[#f2e4e9]"
                    >

                      {/* PRODUCT */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-4">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-16 w-16 rounded-xl object-cover"
                          />

                          <div>

                            <p className="font-semibold text-[#3b2b33]">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              Rating: {product.rating || 0}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* CATEGORY */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.category}
                      </td>


                      {/* PRICE */}
                      <td className="px-6 py-4">

                        <p className="font-semibold text-[#3b2b33]">
                          ₹{product.price}
                        </p>

                        {product.oldPrice && (
                          <p className="text-xs text-gray-400 line-through">
                            ₹{product.oldPrice}
                          </p>
                        )}

                      </td>


                      {/* STOCK */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.stock}
                      </td>


                      {/* ACTIONS */}
                      <td className="px-6 py-4">

                        <div className="flex justify-center gap-2">

                          <Link
                            to={`/admin/edit-product/${product._id}`}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff0f6] text-[#d95c91] transition hover:bg-[#f9d5e4]"
                            title="Edit Product"
                          >
                            <Pencil size={16} />
                          </Link>


                          <button
                            onClick={() =>
                              handleDelete(product._id)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-100"
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

                {/* ORDERS */}
        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="border-b border-[#f2e4e9] px-6 py-5">
            <h2 className="text-xl font-bold text-[#3b2b33]">
              Customer Orders
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage customer orders and update order status
            </p>
          </div>

          {ordersLoading ? (

            <div className="px-6 py-12 text-center">
              <p className="text-[#d95c91] font-medium">
                Loading orders...
              </p>
            </div>

          ) : orders.length === 0 ? (

            <div className="px-6 py-12 text-center">
              <Package
                size={40}
                className="mx-auto mb-3 text-[#d95c91]"
              />

              <p className="text-gray-500">
                No customer orders found.
              </p>
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead className="bg-[#fffafc]">

                  <tr>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Order
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Products
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Total
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Payment
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-t border-[#f2e4e9]"
                    >

                      {/* ORDER */}
                      <td className="px-6 py-4">

                        <p className="font-semibold text-[#3b2b33]">
                          #{order._id.slice(-8)}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </td>


                      {/* CUSTOMER */}
                      <td className="px-6 py-4">

                        <p className="font-medium text-[#3b2b33]">
                          {order.shippingAddress?.fullName}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {order.shippingAddress?.phone}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {order.shippingAddress?.city},{" "}
                          {order.shippingAddress?.state}
                        </p>

                      </td>


                      {/* PRODUCTS */}
                      <td className="px-6 py-4">

                        <div className="space-y-2">

                          {order.items?.map((item, index) => (

                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >

                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />

                              <div>

                                <p className="text-sm font-medium text-gray-700">
                                  {item.name}
                                </p>

                                <p className="text-xs text-gray-500">
                                  Qty: {item.quantity}
                                </p>

                              </div>

                            </div>

                          ))}

                        </div>

                      </td>


                      {/* TOTAL */}
                      <td className="px-6 py-4">

                        <p className="font-semibold text-[#d95c91]">
                          ₹{order.totalAmount}
                        </p>

                      </td>


                      {/* PAYMENT */}
                      <td className="px-6 py-4">

                        <p className="text-sm font-medium text-gray-700">
                          {order.paymentMethod}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {order.paymentStatus}
                        </p>

                      </td>


                      {/* STATUS */}
                      <td className="px-6 py-4">

                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(
                              order._id,
                              e.target.value
                            )
                          }
                          className="rounded-lg border border-[#e8cbd7] bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-[#d95c91]"
                        >

                          <option value="Placed">
                            Placed
                          </option>

                          <option value="Confirmed">
                            Confirmed
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;