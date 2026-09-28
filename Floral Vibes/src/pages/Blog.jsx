import React from "react";
import { ArrowRight, CalendarDays, Clock3, Flower2 } from "lucide-react";

import blog1 from "../assets/images/images (9).jpg";
import blog2 from "../assets/images/images (10).jpg";
import blog3 from "../assets/images/images (11).jpg";
import blog4 from "../assets/images/images (12).jpg";
import blog5 from "../assets/images/images (13).jpg";
import blog6 from "../assets/images/images (14).jpg";

const blogPosts = [
  {
    id: 1,
    image: blog1,
    category: "Flower Care",
    title: "How to Keep Your Flowers Fresh for Longer",
    description:
      "Simple and easy tips to keep your favourite flowers fresh, beautiful and healthy for several days.",
    date: "September 05, 2026",
    time: "5 min read",
  },
  {
    id: 2,
    image: blog2,
    category: "Flower Guide",
    title: "The Meaning Behind Your Favourite Flowers",
    description:
      "Roses, tulips, sunflowers and lilies all have a special meaning. Discover what your favourite flowers say.",
    date: "September 02, 2026",
    time: "4 min read",
  },
  {
    id: 3,
    image: blog3,
    category: "Gifting Ideas",
    title: "Best Flowers to Gift Someone Special",
    description:
      "Looking for the perfect gift? Explore beautiful flower choices for birthdays, anniversaries and special moments.",
    date: "August 28, 2026",
    time: "6 min read",
  },
  {
    id: 4,
    image: blog4,
    category: "Flower Care",
    title: "Easy Ways to Take Care of Roses",
    description:
      "Give your roses the care they deserve with these simple everyday tips for longer-lasting blooms.",
    date: "August 24, 2026",
    time: "5 min read",
  },
  {
    id: 5,
    image: blog5,
    category: "Home Decor",
    title: "Beautiful Flower Ideas for Your Home",
    description:
      "Add freshness and colour to your home with simple flower decoration and arrangement ideas.",
    date: "August 20, 2026",
    time: "4 min read",
  },
  {
    id: 6,
    image: blog6,
    category: "Seasonal Flowers",
    title: "Flowers That Make Every Season Beautiful",
    description:
      "Discover some of the most beautiful seasonal flowers and learn when they bloom best.",
    date: "August 15, 2026",
    time: "5 min read",
  },
];

function Blog() {
  return (
    <div className="min-h-screen bg-[#fffafc] text-[#3d3035]">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff1f6] via-[#fff8fb] to-[#fdf0f7] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">

          <div className="mb-5 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
              <Flower2
                size={28}
                strokeWidth={1.7}
                className="text-[#d95c91]"
              />
            </div>
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d95c91]">
            Floral Vibes Journal
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Bloom Into Something
            <span className="block text-[#d95c91]">Beautiful 🌸</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#705e65] sm:text-lg">
            Discover flower care tips, gifting ideas, home decoration
            inspiration and everything you need to know about beautiful blooms.
          </p>
        </div>
      </section>

      {/* ================= BLOG SECTION ================= */}
      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#d95c91]">
              Our Latest Stories
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Fresh From Our Blog
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-[#75666c]">
              Little tips and beautiful ideas to make your flower moments even
              more special.
            </p>
          </div>

          {/* Blog Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-3xl border border-[#f3dfe8] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Category */}
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#c84f82] shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">

                  {/* Date + Read Time */}
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-[#8b7b82]">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={14} />
                      {post.date}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3 size={14} />
                      {post.time}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-snug text-[#3d3035] transition group-hover:text-[#d95c91]">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#75666c]">
                    {post.description}
                  </p>

                  {/* Read More */}
                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#d95c91] transition hover:gap-3"
                  >
                    Read More
                    <ArrowRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="px-6 pb-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#f9d7e5] via-[#fce7ef] to-[#f8dce8] px-6 py-12 text-center sm:px-12">

          <Flower2
            size={34}
            className="mx-auto mb-4 text-[#d95c91]"
            strokeWidth={1.6}
          />

          <h2 className="text-3xl font-bold text-[#49363e] sm:text-4xl">
            Stay in the Bloom 🌷
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#705e65] sm:text-base">
            Get flower care tips, gifting inspiration and beautiful ideas
            straight to your inbox.
          </p>

          <div className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              className="h-12 flex-1 rounded-full border border-white bg-white px-5 text-sm outline-none placeholder:text-[#a39299] focus:border-[#d95c91]"
            />

            <button
              type="button"
              className="h-12 rounded-full bg-[#d95c91] px-7 text-sm font-semibold text-white transition hover:bg-[#c84f82]"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="border-t border-[#f3dfe8] bg-white px-6 py-14 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Ready to Bring Some Flowers Home?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#75666c]">
          Explore our collection of fresh and beautiful flowers made for every
          special moment.
        </p>

        <a
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d95c91] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c84f82]"
        >
          Explore Flowers
          <ArrowRight size={17} />
        </a>
      </section>

    </div>
  );
}

export default Blog;