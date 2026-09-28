import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Flower2,
  ArrowRight,
  Mail,
  LockKeyhole,
} from "lucide-react";

function Login() {
   const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axiosInstance.post("/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    if (response.data.success) {
      // Token save karna
      localStorage.setItem("token", response.data.token);

      // User information save karna
    // User information save karna
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Navbar ko batana ki user login ho gaya
      window.dispatchEvent(new Event("userUpdated"));

      alert("Login successful! 🌸");

      // Login ke baad Home page
      navigate("/"); 
    }
  } catch (error) {
    console.log("Login Error:", error);

    alert(
      error.response?.data?.message ||
        "Login failed. Please try again."
    );
  }
};

  return (
    <div className="min-h-screen bg-[#fffafc] px-4 py-10 sm:px-6 lg:px-10">

      <div className="mx-auto grid min-h-[650px] max-w-6xl overflow-hidden rounded-3xl border border-[#f3dfe8] bg-white shadow-lg lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}

        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#f9d5e4] via-[#fde9f0] to-[#fff5f8] lg:flex lg:items-center lg:justify-center">

          {/* Decorative circles */}
          <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-white/40" />

          <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-white/40" />

          <div className="relative z-10 px-12 text-center">

            {/* Logo */}
            <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md">
              <Flower2
                size={46}
                strokeWidth={1.5}
                className="text-[#d95c91]"
              />
            </div>

            <h1 className="text-4xl font-bold text-[#49363e]">
              Floral Vibes
            </h1>

            <p className="mt-3 text-lg text-[#705e65]">
              Fresh Flowers, Happier Moments
            </p>

            <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-[#806f76]">
              Welcome back to Floral Vibes. Login to discover beautiful
              flowers, thoughtful gifts and special moments.
            </p>

            {/* Small dots */}
            <div className="mt-8 flex justify-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d95c91]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e9a8c1]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f2cad9]" />
            </div>

          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">

          <div className="w-full max-w-md">

            {/* Heading */}

            <div className="mb-8 text-center">

              {/* Mobile Logo */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0f6] lg:hidden">
                <Flower2
                  size={28}
                  strokeWidth={1.6}
                  className="text-[#d95c91]"
                />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d95c91]">
                Welcome Back
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#3d3035] sm:text-4xl">
                Login
              </h2>

              <p className="mt-3 text-sm text-[#75666c]">
                Login to continue your Floral Vibes journey.
              </p>

            </div>

            {/* ================= FORM ================= */}

            <form onSubmit={handleSubmit}>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#49363e]"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a39299]"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="h-12 w-full rounded-xl border border-[#ead7e0] bg-[#fffafc] px-11 text-sm text-[#3d3035] outline-none transition placeholder:text-[#a39299] focus:border-[#d95c91] focus:ring-2 focus:ring-[#f8d7e5]"
                  />

                </div>
              </div>

              {/* Password */}

              <div className="mt-5">

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#49363e]"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-[#d95c91] hover:underline"
                  >
                    Forgot Password?
                  </button>

                </div>

                <div className="relative">

                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a39299]"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="h-12 w-full rounded-xl border border-[#ead7e0] bg-[#fffafc] px-11 pr-12 text-sm text-[#3d3035] outline-none transition placeholder:text-[#a39299] focus:border-[#d95c91] focus:ring-2 focus:ring-[#f8d7e5]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8d7b83] transition hover:text-[#d95c91]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>
              </div>

              {/* Remember Me */}

              <div className="mt-5 flex items-center gap-2">

                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-[#d95c91]"
                />

                <label
                  htmlFor="remember"
                  className="cursor-pointer text-sm text-[#75666c]"
                >
                  Remember me
                </label>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d95c91] text-sm font-semibold text-white transition duration-300 hover:bg-[#c84f82] hover:shadow-lg"
              >
                Login
                <ArrowRight size={18} />
              </button>

            </form>

            {/* ================= DIVIDER ================= */}

            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-[#ead7e0]" />

              <span className="text-xs text-[#a39299]">
                OR
              </span>

              <div className="h-px flex-1 bg-[#ead7e0]" />

            </div>

            {/* ================= SIGNUP ================= */}

            <div className="text-center">

              <p className="text-sm text-[#75666c]">
                Don't have an account?
              </p>

              <a
                href="/signup"
                className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#d95c91] transition hover:underline"
              >
                Create an Account
                <ArrowRight size={15} />
              </a>

            </div>

            {/* Bottom text */}

            <p className="mt-8 text-center text-xs leading-5 text-[#9a8990]">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;