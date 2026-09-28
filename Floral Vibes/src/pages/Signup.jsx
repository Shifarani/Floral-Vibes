import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Flower2,
  ArrowRight,
  User,
  Mail,
  LockKeyhole,
} from "lucide-react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await axiosInstance.post("/auth/signup", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (response.data.success) {
      alert("Account created successfully! 🌸");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    }
  } catch (error) {
    console.log("Signup Error:", error);

    alert(
      error.response?.data?.message ||
        "Signup failed. Please try again."
    );
  }
};
 

  return (
    <div className="min-h-screen bg-[#fffafc] px-6 py-12 sm:px-10 lg:px-16">

      <div className="mx-auto grid min-h-[680px] max-w-6xl overflow-hidden rounded-3xl border border-[#f3dfe8] bg-white shadow-lg lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#f9d5e4] via-[#fde9f0] to-[#fff5f8] lg:flex lg:flex-col lg:items-center lg:justify-center lg:px-12">

          <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-white/40" />
          <div className="absolute -bottom-16 -right-12 h-56 w-56 rounded-full bg-white/40" />

          <div className="relative z-10 text-center">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
              <Flower2
                size={40}
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

            <p className="mx-auto mt-6 max-w-sm text-sm leading-6 text-[#806f76]">
              Create your Floral Vibes account and discover beautiful flowers,
              thoughtful gifts and happy moments.
            </p>

            <div className="mt-8 flex justify-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#d95c91]" />
              <span className="h-2 w-2 rounded-full bg-[#e9a8c1]" />
              <span className="h-2 w-2 rounded-full bg-[#f2cad9]" />
            </div>

          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">

          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="mb-7 text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff0f6] lg:hidden">
                <Flower2
                  size={25}
                  className="text-[#d95c91]"
                  strokeWidth={1.6}
                />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d95c91]">
                Join Floral Vibes
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#3d3035] sm:text-4xl">
                Create Your Account
              </h2>

              <p className="mt-3 text-sm text-[#75666c]">
                Create an account and start your flower journey.
              </p>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-[#49363e]"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a39299]"
                  />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="h-12 w-full rounded-xl border border-[#ead7e0] bg-[#fffafc] px-11 text-sm text-[#3d3035] outline-none transition placeholder:text-[#a39299] focus:border-[#d95c91] focus:ring-2 focus:ring-[#f8d7e5]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#49363e]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
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
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#49363e]"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a39299]"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    minLength={6}
                    className="h-12 w-full rounded-xl border border-[#ead7e0] bg-[#fffafc] px-11 pr-12 text-sm text-[#3d3035] outline-none transition placeholder:text-[#a39299] focus:border-[#d95c91] focus:ring-2 focus:ring-[#f8d7e5]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8d7b83] hover:text-[#d95c91]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mt-4">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-[#49363e]"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a39299]"
                  />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                    className="h-12 w-full rounded-xl border border-[#ead7e0] bg-[#fffafc] px-11 pr-12 text-sm text-[#3d3035] outline-none transition placeholder:text-[#a39299] focus:border-[#d95c91] focus:ring-2 focus:ring-[#f8d7e5]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8d7b83] hover:text-[#d95c91]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="mt-5 flex items-start gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 accent-[#d95c91]"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-[#75666c]"
                >
                  I agree to the{" "}
                  <span className="font-semibold text-[#d95c91]">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-[#d95c91]">
                    Privacy Policy
                  </span>
                  .
                </label>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d95c91] text-sm font-semibold text-white transition hover:bg-[#c84f82] hover:shadow-lg"
              >
                Create Account
                <ArrowRight size={17} />
              </button>

            </form>

            {/* Login Link */}
            <div className="mt-7 text-center">

              <p className="text-sm text-[#75666c]">
                Already have an account?
              </p>

              <a
                href="/login"
                className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#d95c91] hover:underline"
              >
                Login Here
                <ArrowRight size={15} />
              </a>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;