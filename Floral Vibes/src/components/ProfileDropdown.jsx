import React, { useState, useRef, useEffect } from "react";
import {
  User,
  LogOut,
  Camera,
  X,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  // Dropdown ke bahar click karne par close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setOpen(false);

    // Navbar ko batao ki user logout ho gaya
    window.dispatchEvent(new Event("userUpdated"));

    navigate("/");
  };

  // Camera icon click
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // Profile image upload
  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Sirf image allow
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5 MB.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      setUploading(true);
      setUploadSuccess(false);

      const formData = new FormData();

      formData.append("profileImage", file);

      const response = await axiosInstance.put(
        "/users/profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const updatedUser = response.data.user;

        // Updated user localStorage me save
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Navbar ko updated profile batana
        window.dispatchEvent(new Event("userUpdated"));

        setUploadSuccess(true);

        setTimeout(() => {
          setUploadSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Profile image upload error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to upload profile picture."
      );
    } finally {
      setUploading(false);

      // Same file dobara select kar sake
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ================= PROFILE BUTTON ================= */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2 rounded-full px-2 py-1.5 transition-all duration-300 hover:bg-[#fff0f4]"
      >
        {/* Small Avatar */}
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#d95c91] to-[#b83f76] text-white shadow-md ring-2 ring-transparent transition-all duration-300 group-hover:ring-[#f7c6d8] group-hover:scale-105">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User size={18} />
            )}
          </div>

          {/* Online dot */}
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-400"></span>
        </div>

        <span className="max-w-[100px] truncate text-sm font-semibold text-[#59484c] transition-colors duration-300 group-hover:text-[#d95c91]">
          {user.name}
        </span>

        {/* Arrow */}
        <span
          className={`text-xs text-[#a47784] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* ================= DROPDOWN ================= */}

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-3 w-72 origin-top-right overflow-hidden rounded-3xl border border-[#f3dfe3] bg-white shadow-[0_20px_60px_rgba(217,92,145,0.18)] animate-[profileDrop_0.25s_ease-out]"
        >
          {/* Top Pink Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#fff0f5] via-[#fff7fa] to-white px-5 pb-6 pt-6 text-center">
            
            {/* Decorative circles */}
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#f8c8da]/30"></div>

            <div className="absolute -left-10 bottom-0 h-20 w-20 rounded-full bg-[#fce0ea]/40"></div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-[#9d7882] transition-all duration-200 hover:bg-white hover:text-[#d95c91] hover:rotate-90"
            >
              <X size={16} />
            </button>

            {/* Profile Picture */}
            <div className="relative mx-auto h-24 w-24">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#d95c91] to-[#b83f76] text-white shadow-lg ring-4 ring-white transition-transform duration-300 hover:scale-105">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={38} />
                )}
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Camera Button */}
              <button
                type="button"
                onClick={handleCameraClick}
                disabled={uploading}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-white bg-[#d95c91] text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-[#c84f82] disabled:cursor-not-allowed disabled:opacity-70"
                title="Change profile picture"
              >
                {uploading ? (
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                  />
                ) : uploadSuccess ? (
                  <CheckCircle2 size={17} />
                ) : (
                  <Camera size={17} />
                )}
              </button>
            </div>

            {/* Name */}
            <h3 className="mt-4 text-lg font-bold text-[#3d3035]">
              {user.name}
            </h3>

            {/* Email */}
            <p className="mt-1 break-all text-xs text-[#887579]">
              {user.email}
            </p>

            {/* Upload text */}
            <p className="mt-3 text-[11px] text-[#b07b8b]">
              {uploading
                ? "Uploading profile picture..."
                : uploadSuccess
                ? "Profile picture updated ✓"
                : "Click the camera to change your picture"}
            </p>
          </div>

          {/* ================= USER INFO ================= */}

          <div className="border-t border-[#f7e8ed] px-4 py-4">
            <div className="mb-3 rounded-2xl bg-[#fff7fa] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#b07b8b]">
                Account
              </p>

              <div className="mt-1 flex items-center gap-2">
                <User size={15} className="text-[#d95c91]" />

                <p className="truncate text-sm font-medium text-[#59484c]">
                  {user.name}
                </p>
              </div>
            </div>


            {/* My Orders */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate("/MyOrders");
              }}
              className="group mb-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[#59484c] transition-all duration-300 hover:bg-[#fff0f5] hover:text-[#d95c91]"
            >
              <span className="text-lg">📦</span>
              <span>My Orders</span>
            </button>

            {/* Admin Dashboard */}
            {user.role === "admin" && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/admin");
                }}
                className="group mb-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[#59484c] transition-all duration-300 hover:bg-[#fff0f5] hover:text-[#d95c91]"
              >
                <span className="text-lg">🛠️</span>
                <span>Admin Dashboard</span>
              </button>
            )}

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d95c91] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c84f82] hover:shadow-lg active:translate-y-0"
            >
              <LogOut
                size={17}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;