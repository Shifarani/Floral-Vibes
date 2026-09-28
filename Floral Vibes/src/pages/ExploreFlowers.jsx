
import React from "react";
import { ShoppingCart, Heart, Star, ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Images from src/assets/images
import flower1 from "../assets/images/images (1).jpg";
import flower2 from "../assets/images/images (2).jpg";
import flower3 from "../assets/images/images (3).jpg";
import flower4 from "../assets/images/images (4).jpg";
import flower5 from "../assets/images/images (5).jpg";
import flower6 from "../assets/images/images (6).jpg";
import flower7 from "../assets/images/images (7).jpg";
import flower8 from "../assets/images/images (8).jpg";
import flower9 from "../assets/images/images (9).jpg";
import flower10 from "../assets/images/images (10).jpg";
import flower11 from "../assets/images/images (11).jpg";
import flower12 from "../assets/images/images (12).jpg";

const flowers = [
  {
    id: 1,
    name: "Red Rose Bouquet",
    category: "Roses",
    price: 499,
    rating: 4.8,
    image: flower1,
  },
  {
    id: 2,
    name: "Beautiful Tulips",
    category: "Tulips",
    price: 599,
    rating: 4.7,
    image: flower2,
  },
  {
    id: 3,
    name: "Yellow Sunflower",
    category: "Sunflowers",
    price: 399,
    rating: 4.9,
    image: flower3,
  },
  {
    id: 4,
    name: "Pink Rose Bouquet",
    category: "Roses",
    price: 549,
    rating: 4.6,
    image: flower4,
  },
  {
    id: 5,
    name: "Fresh White Flowers",
    category: "Lilies",
    price: 449,
    rating: 4.8,
    image: flower5,
  },
  {
    id: 6,
    name: "Mixed Flower Bouquet",
    category: "Mixed",
    price: 699,
    rating: 4.9,
    image: flower6,
  },
  {
    id: 7,
    name: "Pink Tulip Bouquet",
    category: "Tulips",
    price: 649,
    rating: 4.8,
    image: flower7,
  },
  {
    id: 8,
    name: "Fresh Sunflower Bunch",
    category: "Sunflowers",
    price: 449,
    rating: 4.7,
    image: flower8,
  },
  {
    id: 9,
    name: "Lovely Garden Flowers",
    category: "Mixed",
    price: 499,
    rating: 4.6,
    image: flower9,
  },
  {
    id: 10,
    name: "Elegant Rose Bouquet",
    category: "Roses",
    price: 749,
    rating: 4.9,
    image: flower10,
  },
  {
    id: 11,
    name: "Lovely Pink Flowers",
    category: "Mixed",
    price: 529,
    rating: 4.7,
    image: flower11,
  },
  {
    id: 12,
    name: "Sunshine Bouquet",
    category: "Sunflowers",
    price: 599,
    rating: 4.8,
    image: flower12,
  },
];

function ExploreFlowers() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`

        * {
          box-sizing: border-box;
        }

        .explore-page {
          min-height: 100vh;
          background: #fffafc;
          color: #3d3035;
          font-family: Arial, sans-serif;
          padding-bottom: 60px;
        }

        /* ==============================
           TOP HERO
        ============================== */

        .explore-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            120deg,
            #fff0f4,
            #fff8fa,
            #fff1ea
          );
          padding: 70px 7% 75px;
        }

        .hero-decoration {
          position: absolute;
          font-size: 90px;
          opacity: 0.18;
          pointer-events: none;
        }

        .flower-one {
          right: 7%;
          top: 25px;
        }

        .flower-two {
          right: 17%;
          bottom: 15px;
          font-size: 55px;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 760px;
          margin: auto;
          text-align: center;
        }

        .back-btn {
          position: absolute;
          left: 7%;
          top: 28px;
          display: flex;
          align-items: center;
          gap: 7px;
          border: none;
          background: white;
          color: #704052;
          padding: 10px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(100, 50, 60, 0.08);
          transition: 0.3s;
        }

        .back-btn:hover {
          transform: translateX(-3px);
          color: #d94f70;
        }

        .small-heading {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #d94f70;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .explore-hero h1 {
          margin: 0;
          font-size: 48px;
          line-height: 1.15;
          color: #38272b;
        }

        .explore-hero h1 span {
          color: #d94f70;
        }

        .hero-text {
          max-width: 650px;
          margin: 16px auto 0;
          color: #76656b;
          font-size: 16px;
          line-height: 1.8;
        }

        .hero-pills {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 25px;
        }

        .hero-pill {
          background: white;
          padding: 9px 17px;
          border-radius: 50px;
          font-size: 13px;
          color: #65545a;
          box-shadow: 0 4px 12px rgba(80, 40, 50, 0.06);
        }

        /* ==============================
           PRODUCTS SECTION
        ============================== */

        .products-section {
          width: 86%;
          max-width: 1400px;
          margin: 0 auto;
          padding-top: 55px;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          margin-bottom: 28px;
        }

        .section-heading p {
          margin: 0 0 5px;
          color: #d94f70;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .section-heading h2 {
          margin: 0;
          font-size: 30px;
          color: #38272b;
        }

        .flower-count {
          color: #8c777d;
          font-size: 14px;
        }

        /* ==============================
           PRODUCT GRID
        ============================== */

        .flower-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }

        .flower-card {
          background: white;
          border: 1px solid #f2dfe3;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 5px 18px rgba(70, 35, 45, 0.06);
          transition: 0.35s ease;
          cursor: pointer;
        }

        .flower-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 15px 35px rgba(70, 35, 45, 0.12);
        }

        .image-box {
          height: 275px;
          position: relative;
          overflow: hidden;
          background: #fff3f5;
        }

        .image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .flower-card:hover .image-box img {
          transform: scale(1.07);
        }

        .category-badge {
          position: absolute;
          left: 14px;
          top: 14px;
          background: white;
          color: #d94f70;
          padding: 6px 11px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .wishlist {
          position: absolute;
          right: 14px;
          top: 14px;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #59484c;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: 0.3s;
        }

        .wishlist:hover {
          transform: scale(1.1);
          color: #d94f70;
        }

        .card-content {
          padding: 18px;
        }

        .card-content h3 {
          margin: 0;
          font-size: 18px;
          color: #3d3033;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 9px;
          color: #e5a629;
          font-size: 13px;
        }

        .rating span {
          color: #7d6d71;
        }

        .card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 17px;
        }

        .price {
          font-size: 21px;
          font-weight: 700;
          color: #d94f70;
        }

        .price small {
          display: block;
          margin-top: 3px;
          color: #a18f93;
          font-size: 10px;
          font-weight: 400;
        }

        .add-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          border: none;
          border-radius: 50px;
          background: #d94f70;
          color: white;
          padding: 10px 15px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .add-btn:hover {
          background: #c94062;
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(217, 79, 112, 0.25);
        }

        /* ==============================
           BOTTOM CTA
        ============================== */

        .bottom-cta {
          width: 86%;
          max-width: 1400px;
          margin: 60px auto 0;
          padding: 45px 25px;
          border-radius: 28px;
          background: linear-gradient(
            120deg,
            #d94f70,
            #e77991
          );
          color: white;
          text-align: center;
          box-shadow: 0 12px 30px rgba(217, 79, 112, 0.18);
        }

        .bottom-cta h2 {
          margin: 0;
          font-size: 30px;
        }

        .bottom-cta p {
          max-width: 600px;
          margin: 12px auto 0;
          line-height: 1.7;
          font-size: 15px;
          opacity: 0.92;
        }

        .back-shop-btn {
          margin-top: 23px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          border-radius: 50px;
          background: white;
          color: #d94f70;
          padding: 12px 22px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }

        .back-shop-btn:hover {
          transform: scale(1.05);
        }

        /* ==============================
           TABLET
        ============================== */

        @media (max-width: 1100px) {
          .flower-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* ==============================
           MOBILE
        ============================== */

        @media (max-width: 800px) {
          .explore-hero {
            padding: 100px 6% 55px;
          }

          .back-btn {
            top: 25px;
            left: 6%;
          }

          .explore-hero h1 {
            font-size: 36px;
          }

          .flower-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 17px;
          }

          .image-box {
            height: 230px;
          }

          .products-section {
            width: 90%;
          }

          .section-heading {
            align-items: start;
            flex-direction: column;
            gap: 8px;
          }
        }

        @media (max-width: 500px) {
          .explore-hero h1 {
            font-size: 29px;
          }

          .hero-text {
            font-size: 14px;
          }

          .flower-grid {
            grid-template-columns: 1fr;
          }

          .image-box {
            height: 300px;
          }

          .bottom-cta {
            width: 90%;
          }

          .bottom-cta h2 {
            font-size: 24px;
          }
        }

      `}</style>

      <div className="explore-page">

        {/* ==============================
            HERO
        ============================== */}

        <section className="explore-hero">

          <div className="hero-decoration flower-one">🌸</div>
          <div className="hero-decoration flower-two">🌷</div>

          <button
            className="back-btn"
            onClick={() => navigate("/shop")}
          >
            <ArrowLeft size={18} />
            Back to Shop
          </button>

          <div className="hero-content">

            <div className="small-heading">
              <Sparkles size={15} />
              Floral Vibes Collection
            </div>

            <h1>
              Discover More
              <br />
              <span>Beautiful Flowers 🌸</span>
            </h1>

            <p className="hero-text">
              Explore our lovely collection of fresh flowers and
              beautiful bouquets, carefully selected to make every
              special moment a little more beautiful.
            </p>

            <div className="hero-pills">
              <span className="hero-pill">🌹 Fresh Roses</span>
              <span className="hero-pill">🌷 Lovely Tulips</span>
              <span className="hero-pill">🌻 Bright Sunflowers</span>
              <span className="hero-pill">💐 Beautiful Bouquets</span>
            </div>

          </div>

        </section>

        {/* ==============================
            PRODUCTS
        ============================== */}

        <section className="products-section">

          <div className="section-heading">

            <div>
              <p>Our Extended Collection</p>
              <h2>Find Your Perfect Flowers</h2>
            </div>

            <span className="flower-count">
              {flowers.length} beautiful flowers
            </span>

          </div>

          <div className="flower-grid">

            {flowers.map((flower) => (

              <div
                className="flower-card"
                key={flower.id}
                onClick={() => navigate(`/product/${flower.id}`)}
                >

                <div className="image-box">

                  <img
                    src={flower.image}
                    alt={flower.name}
                  />

                  <span className="category-badge">
                    {flower.category}
                  </span>

                 <button
                    className="wishlist"
                    aria-label="Add to wishlist"
                    onClick={(e) => e.stopPropagation()}
                    >
                    <Heart size={19} />
                  </button>

                </div>

                <div className="card-content">

                  <h3>{flower.name}</h3>

                  <div className="rating">
                    <Star size={15} fill="currentColor" />
                    <span>
                      {flower.rating} • Excellent
                    </span>
                  </div>

                  <div className="card-bottom">

                    <div className="price">
                      ₹{flower.price}
                      <small>Freshly arranged</small>
                    </div>

                    <button className="add-btn">
                      <ShoppingCart size={16} />
                      Add
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* ==============================
            BOTTOM CTA
        ============================== */}

        <section className="bottom-cta">

          <h2>
            Make Someone Smile Today 🌷
          </h2>

          <p>
            A beautiful bouquet can say what words sometimes cannot.
            Choose your favourite flowers and spread a little happiness.
          </p>

          <button
            className="back-shop-btn"
            onClick={() => navigate("/shop")}
          >
            <ArrowLeft size={17} />
            Back to Shop
          </button>

        </section>

      </div>
    </>
  );
}

export default ExploreFlowers;
