
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  Send,
  Flower2,
  Heart,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you for contacting Floral Vibes! 🌸");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#fffafc] text-[#3d3035]">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff0f6] via-[#fff8fb] to-[#fcebf3] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
            <Flower2
              size={29}
              strokeWidth={1.7}
              className="text-[#d95c91]"
            />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d95c91]">
            Get In Touch
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
            Let's Talk About
            <span className="block text-[#d95c91]">
              Flowers & Happiness 🌸
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#705e65] sm:text-lg">
            Have a question, suggestion or simply want to say hello?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ================= CONTACT INFO + FORM ================= */}
      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">

          {/* ================= LEFT INFO ================= */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d95c91]">
              Contact Information
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              We'd love to hear from you
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-[#75666c]">
              Whether you need help choosing the perfect bouquet or have a
              question about your order, our team is always happy to help.
            </p>

            {/* Contact Cards */}
            <div className="mt-8 space-y-5">

              {/* Address */}
              <div className="flex items-start gap-4 rounded-2xl border border-[#f3dfe8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff0f6]">
                  <MapPin size={22} className="text-[#d95c91]" />
                </div>

                <div>
                  <h3 className="font-semibold">Our Location</h3>
                  <p className="mt-1 text-sm leading-6 text-[#75666c]">
                    Floral Vibes Studio
                    <br />
                    Green Garden Street
                    <br />
                    New Delhi, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 rounded-2xl border border-[#f3dfe8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff0f6]">
                  <Phone size={22} className="text-[#d95c91]" />
                </div>

                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="mt-1 text-sm text-[#75666c]">
                    +91 98765 43210
                  </p>
                  <p className="mt-1 text-xs text-[#9a8990]">
                    Mon - Sat, 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 rounded-2xl border border-[#f3dfe8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff0f6]">
                  <Mail size={22} className="text-[#d95c91]" />
                </div>

                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="mt-1 text-sm text-[#75666c]">
                    hello@floralvibes.com
                  </p>
                  <p className="mt-1 text-xs text-[#9a8990]">
                    We usually reply within 24 hours
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 rounded-2xl border border-[#f3dfe8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff0f6]">
                  <Clock3 size={22} className="text-[#d95c91]" />
                </div>

                <div>
                  <h3 className="font-semibold">Working Hours</h3>
                  <p className="mt-1 text-sm text-[#75666c]">
                    Monday - Saturday
                  </p>
                  <p className="mt-1 text-sm text-[#75666c]">
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="rounded-3xl border border-[#f3dfe8] bg-white p-6 shadow-sm sm:p-8 lg:p-10">

            <div className="mb-7">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Send Us a Message 💌
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#75666c]">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="h-12 w-full rounded-xl border border-[#ead7e0] bg-[#fffafc] px-4 text-sm outline-none transition focus:border-[#d95c91] focus:ring-2 focus:ring-[#f8d7e5]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="h-12 w-full rounded-xl border border-[#ead7e0] bg-[#fffafc] px-4 text-sm outline-none transition focus:border-[#d95c91] focus:ring-2 focus:ring-[#f8d7e5]"
                  />
                </div>

              </div>

              {/* Subject */}
              <div className="mt-5">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What would you like to talk about?"
                  required
                  className="h-12 w-full rounded-xl border border-[#ead7e0] bg-[#fffafc] px-4 text-sm outline-none transition focus:border-[#d95c91] focus:ring-2 focus:ring-[#f8d7e5]"
                />
              </div>

              {/* Message */}
              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  rows="6"
                  className="w-full resize-none rounded-xl border border-[#ead7e0] bg-[#fffafc] px-4 py-3 text-sm outline-none transition focus:border-[#d95c91] focus:ring-2 focus:ring-[#f8d7e5]"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d95c91] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c84f82] hover:shadow-lg"
              >
                Send Message
                <Send size={17} />
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* ================= HEART MESSAGE ================= */}
      <section className="px-6 pb-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-[#f9d7e5] via-[#fce8ef] to-[#f8dce8] px-6 py-12 text-center">

          <Heart
            size={34}
            fill="currentColor"
            className="mx-auto mb-4 text-[#d95c91]"
          />

          <h2 className="text-2xl font-bold sm:text-3xl">
            Every Message Matters to Us
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#705e65] sm:text-base">
            At Floral Vibes, we believe flowers are more than just beautiful.
            They are little ways of showing love, care and happiness.
          </p>

        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="border-t border-[#f3dfe8] bg-white px-6 py-14 text-center">

        <Flower2
          size={30}
          className="mx-auto mb-4 text-[#d95c91]"
          strokeWidth={1.6}
        />

        <h2 className="text-2xl font-bold sm:text-3xl">
          Looking for the Perfect Flowers?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#75666c]">
          Explore our collection and find something beautiful for your special
          moment.
        </p>

        <a
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d95c91] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c84f82]"
        >
          Shop Flowers
          <Flower2 size={17} />
        </a>

      </section>

    </div>
  );
}

export default Contact;

