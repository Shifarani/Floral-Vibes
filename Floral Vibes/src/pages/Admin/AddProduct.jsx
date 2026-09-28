import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Upload, Plus } from "lucide-react";
import axiosInstance from "../../axiosInstance";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select a product image");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("oldPrice", formData.oldPrice);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      data.append("image", image);

      const response = await axiosInstance.post(
        "/products",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Product added successfully 🌸");

        navigate("/admin");
      }
    } catch (error) {
      console.log("Add Product Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafc] px-4 py-8 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-[#3b2b33]">
              Add New Product 🌸
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Add a new bouquet to Floral Vibes
            </p>
          </div>

          <Link
            to="/admin"
            className="flex items-center gap-2 rounded-full border border-[#e8cbd7] px-5 py-2.5 text-sm font-medium text-[#6b4b57] hover:bg-[#fff0f6]"
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
              placeholder="Red Rose Bouquet"
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
              placeholder="Fresh and beautiful red roses..."
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
                placeholder="449"
                required
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
                placeholder="549"
                className="w-full rounded-xl border border-[#ead9e0] px-4 py-3 outline-none focus:border-[#d95c91]"
              />

            </div>

          </div>


          {/* CATEGORY + STOCK */}
          <div className="mb-5 grid gap-5 sm:grid-cols-2">

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
                placeholder="10"
                required
                min="0"
                className="w-full rounded-xl border border-[#ead9e0] px-4 py-3 outline-none focus:border-[#d95c91]"
              />

            </div>

          </div>


          {/* IMAGE */}
          <div className="mb-7">

            <label className="mb-2 block text-sm font-semibold text-[#3b2b33]">
              Product Image
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#e8cbd7] bg-[#fffafc] px-6 py-10 text-center transition hover:bg-[#fff0f6]">

              <Upload
                size={30}
                className="mb-3 text-[#d95c91]"
              />

              <span className="text-sm font-semibold text-[#3b2b33]">
                {image
                  ? image.name
                  : "Click to upload product image"}
              </span>

              <span className="mt-1 text-xs text-gray-500">
                JPG, PNG or WEBP
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

          </div>


          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d95c91] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c84f82] disabled:cursor-not-allowed disabled:opacity-60"
          >

            <Plus size={18} />

            {loading
              ? "Adding Product..."
              : "Add Product"}

          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;