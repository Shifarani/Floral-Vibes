import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import axiosInstance from "../../axiosInstance";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================
  // CHECK ADMIN + GET PRODUCT
  // =========================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!token || !user || user.role !== "admin") {
      alert("Access denied. Admin only.");
      navigate("/");
      return;
    }

    fetchProduct();
  }, [id, navigate]);

  // =========================
  // GET SINGLE PRODUCT
  // =========================
  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);

      if (response.data.success) {
        const product = response.data.product;

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          oldPrice: product.oldPrice || "",
          category: product.category || "",
          stock: product.stock || "",
        });

        setImage(product.image || "");
      }
    } catch (error) {
      console.log("Fetch Product Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load product"
      );

      navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // UPDATE PRODUCT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await axiosInstance.put(
        `/products/${id}`,
        {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          oldPrice: formData.oldPrice,
          category: formData.category,
          stock: formData.stock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Product updated successfully 🌸");

        navigate("/admin");
      }
    } catch (error) {
      console.log("Update Product Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update product"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffafc]">
        <p className="text-lg font-medium text-[#d95c91]">
          Loading product...
        </p>
      </div>
    );
  }

  // =========================
  // EDIT PRODUCT PAGE
  // =========================
  return (
    <div className="min-h-screen bg-[#fffafc] px-4 py-8 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-[#3b2b33]">
              Edit Product 🌸
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Update your Floral Vibes product
            </p>
          </div>

          <Link
            to="/admin"
            className="flex items-center gap-2 rounded-full border border-[#e8cbd7] px-5 py-2.5 text-sm font-medium text-[#6b4b57] transition hover:bg-[#fff0f6]"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-sm sm:p-8"
        >

          {/* PRODUCT IMAGE */}
          <div className="mb-7">

            <label className="mb-2 block text-sm font-semibold text-[#3b2b33]">
              Current Product Image
            </label>

            {image && (
              <img
                src={image}
                alt={formData.name}
                className="h-48 w-48 rounded-2xl object-cover shadow-sm"
              />
            )}

            <p className="mt-2 text-xs text-gray-500">
              Product image cannot be changed from this page.
            </p>

          </div>


          {/* PRODUCT NAME */}
          <div className="mb-5">

            <label className="mb-2 block text-sm font-semibold text-[#3b2b33]">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#ead9e0] px-4 py-3 outline-none focus:border-[#d95c91]"
            />

          </div>


          {/* DESCRIPTION */}
          <div className="mb-5">

            <label className="mb-2 block text-sm font-semibold text-[#3b2b33]">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full resize-none rounded-xl border border-[#ead9e0] px-4 py-3 outline-none focus:border-[#d95c91]"
            />

          </div>


          {/* PRICE */}
          <div className="mb-5 grid gap-5 sm:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-semibold text-[#3b2b33]">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full rounded-xl border border-[#ead9e0] px-4 py-3 outline-none focus:border-[#d95c91]"
              />

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold text-[#3b2b33]">
                Old Price
              </label>

              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                min="0"
                className="w-full rounded-xl border border-[#ead9e0] px-4 py-3 outline-none focus:border-[#d95c91]"
              />

            </div>

          </div>


          {/* CATEGORY + STOCK */}
          <div className="mb-7 grid gap-5 sm:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-semibold text-[#3b2b33]">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#ead9e0] bg-white px-4 py-3 outline-none focus:border-[#d95c91]"
              >

                <option value="">
                  Select Category
                </option>

                <option value="Roses">
                  Roses
                </option>

                <option value="Mixed Flowers">
                  Mixed Flowers
                </option>

                <option value="Sunflowers">
                  Sunflowers
                </option>

                <option value="Tulips">
                  Tulips
                </option>

                <option value="Delight Flowers">
                  Delight Flowers
                </option>

              </select>

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold text-[#3b2b33]">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full rounded-xl border border-[#ead9e0] px-4 py-3 outline-none focus:border-[#d95c91]"
              />

            </div>

          </div>


          {/* SAVE BUTTON */}
          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d95c91] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c84f82] disabled:cursor-not-allowed disabled:opacity-60"
          >

            <Save size={18} />

            {saving
              ? "Updating Product..."
              : "Update Product"}

          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;