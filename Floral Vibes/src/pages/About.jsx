import React from "react";
import {
  Flower2,
  Heart,
  Truck,
  Sparkles,
  ShieldCheck,
  Gift,
} from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-[#fffafc] text-[#3d3035]">

      {/* ================================
          HERO SECTION
      ================================= */}

      <section className="bg-gradient-to-r from-[#fff0f4] via-[#fff8fa] to-[#fff1ea]">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 lg:px-10 lg:py-20">

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#d94f70] sm:text-sm">
            Welcome to Floral Vibes
          </p>

          <h1 className="text-4xl font-bold leading-tight text-[#38272b] sm:text-5xl lg:text-6xl">
            Flowers That Make
            <span className="block text-[#d94f70]">
              Moments Beautiful
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#76656b] sm:text-base lg:text-lg">
            At Floral Vibes, we believe every beautiful moment deserves
            beautiful flowers. We bring fresh flowers and lovely bouquets
            together to make your special days even more memorable.
          </p>

        </div>
      </section>


      {/* ================================
          OUR STORY
      ================================= */}

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* LEFT */}

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d94f70] sm:text-sm">
              Our Story
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#38272b] sm:text-4xl">
              More Than Just Flowers
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#76656b] sm:text-base">
              Floral Vibes was created with a simple idea — to make
              gifting flowers easy, beautiful and meaningful.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#76656b] sm:text-base">
              From romantic roses to cheerful sunflowers and elegant
              lilies, we carefully bring together flowers that can
              express feelings when words are not enough.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#76656b] sm:text-base">
              Whether it is a birthday, anniversary, celebration or
              simply a surprise for someone special, Floral Vibes is
              here to add a little more happiness to the moment.
            </p>

          </div>


          {/* RIGHT CARD */}

          <div className="relative">

            <div className="rounded-3xl bg-gradient-to-br from-[#fff0f4] to-[#ffe5ec] p-8 text-center shadow-sm sm:p-12">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md">
                <Flower2
                  size={45}
                  className="text-[#d94f70]"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#38272b]">
                Fresh Flowers
              </h3>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#76656b]">
                Beautiful flowers, thoughtful arrangements and
                happiness delivered to your doorstep.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================
          WHY CHOOSE US
      ================================= */}

      <section className="bg-white py-14 sm:py-16">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d94f70] sm:text-sm">
              Why Floral Vibes
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#38272b] sm:text-4xl">
              Why Choose Us?
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#76656b] sm:text-base">
              We focus on quality, care and beautiful experiences.
            </p>

          </div>


          {/* FEATURES */}

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* CARD 1 */}

            <div className="rounded-2xl border border-[#f3dfe3] bg-[#fffafc] p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0f4]">
                <Flower2
                  size={27}
                  className="text-[#d94f70]"
                />
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#38272b]">
                Fresh Flowers
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#76656b]">
                Carefully selected flowers for a fresh and beautiful
                experience.
              </p>

            </div>


            {/* CARD 2 */}

            <div className="rounded-2xl border border-[#f3dfe3] bg-[#fffafc] p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0f4]">
                <Gift
                  size={27}
                  className="text-[#d94f70]"
                />
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#38272b]">
                Beautiful Gifts
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#76656b]">
                Lovely bouquets made to make every special occasion
                memorable.
              </p>

            </div>


            {/* CARD 3 */}

            <div className="rounded-2xl border border-[#f3dfe3] bg-[#fffafc] p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0f4]">
                <Truck
                  size={27}
                  className="text-[#d94f70]"
                />
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#38272b]">
                Fast Delivery
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#76656b]">
                We make it easy to send your love and wishes wherever
                they need to go.
              </p>

            </div>


            {/* CARD 4 */}

            <div className="rounded-2xl border border-[#f3dfe3] bg-[#fffafc] p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0f4]">
                <Heart
                  size={27}
                  className="text-[#d94f70]"
                />
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#38272b]">
                Made With Care
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#76656b]">
                Every bouquet is prepared with love and attention
                to detail.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================
          OUR VALUES
      ================================= */}

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">

        <div className="rounded-3xl bg-gradient-to-r from-[#fff0f4] to-[#fff4ee] px-6 py-10 sm:px-10 lg:px-16">

          <div className="grid items-center gap-8 md:grid-cols-2">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d94f70]">
                Our Promise
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#38272b] sm:text-4xl">
                Bringing Happiness,
                <span className="block text-[#d94f70]">
                  One Flower at a Time
                </span>
              </h2>

            </div>

            <div className="space-y-4">

              <div className="flex items-start gap-3">

                <ShieldCheck
                  size={22}
                  className="mt-1 flex-shrink-0 text-[#d94f70]"
                />

                <p className="text-sm leading-6 text-[#76656b]">
                  Quality flowers and thoughtful arrangements for
                  every occasion.
                </p>

              </div>

              <div className="flex items-start gap-3">

                <Sparkles
                  size={22}
                  className="mt-1 flex-shrink-0 text-[#d94f70]"
                />

                <p className="text-sm leading-6 text-[#76656b]">
                  Beautiful designs that turn simple moments into
                  memorable ones.
                </p>

              </div>

              <div className="flex items-start gap-3">

                <Heart
                  size={22}
                  className="mt-1 flex-shrink-0 text-[#d94f70]"
                />

                <p className="text-sm leading-6 text-[#76656b]">
                  A little love and care in every bouquet we create.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================
          CTA
      ================================= */}

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-10">

        <div className="rounded-3xl bg-gradient-to-r from-[#d94f70] to-[#e77991] px-6 py-10 text-center text-white shadow-md sm:px-10">

          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Find Your Perfect Flowers? 🌷
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/90 sm:text-base">
            Explore our beautiful collection and make someone's
            day a little brighter.
          </p>

          <a
            href="/shop"
            className="mt-6 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#d94f70] transition duration-200 hover:scale-105"
          >
            Explore Flowers
          </a>

        </div>

      </section>

    </div>
  );
}

export default About;