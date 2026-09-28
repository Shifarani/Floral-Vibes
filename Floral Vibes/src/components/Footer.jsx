import { Link } from "react-router-dom";
import {
  
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

function Footer() {
  return (
    <>
      <style>{`

        /* ================================
           FOOTER
        ================================= */

        .footer {
          background: #a5083c;
          color: white;
          margin-top: 0;
        }

        .footer-main {
          padding: 55px 7% 40px;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
          gap: 45px;
        }

        /* Logo / About */

        .footer-logo {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .footer-logo-icon {
          width: 42px;
          height: 42px;
          background: #f5d8df;
          color: #d83f6b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
        }

        .footer-logo-text {
          display: flex;
          flex-direction: column;
        }

        .footer-logo-text strong {
          color: white;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 21px;
        }

        .footer-logo-text span {
          color: #d9aaa3;
          font-size: 9px;
          margin-top: 2px;
        }

        .footer-about {
          max-width: 300px;
          color: #c0cbc6;
          font-size: 12px;
          line-height: 1.8;
        }

        /* Headings */

        .footer-column h3 {
          margin: 0 0 18px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 17px;
          color: white;
        }

        .footer-column h3::after {
          content: "";
          display: block;
          width: 25px;
          height: 2px;
          background: #e83e71;
          margin-top: 7px;
        }

        /* Links */

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links a {
          text-decoration: none;
          color: #bdc8c3;
          font-size: 12px;
          transition: 0.3s;
        }

        .footer-links a:hover {
          color: #f18aa7;
          transform: translateX(3px);
        }

        /* Contact */

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          color: #bdc8c3;
          font-size: 11px;
          line-height: 1.5;
        }

        .contact-item svg {
          color: #ed7092;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* Newsletter */

        .newsletter {
          margin-top: 20px;
        }

        .newsletter p {
          color: #bdc8c3;
          font-size: 11px;
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .newsletter-box {
          display: flex;
          background: white;
          border-radius: 5px;
          overflow: hidden;
          height: 39px;
        }

        .newsletter-box input {
          min-width: 0;
          flex: 1;
          border: none;
          outline: none;
          padding: 0 11px;
          font-size: 10px;
          color: #333;
        }

        .newsletter-box button {
          width: 42px;
          border: none;
          background: #e83e71;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .newsletter-box button:hover {
          background: #d42d5e;
        }

        /* Social */

        .social-links {
          display: flex;
          gap: 8px;
          margin-top: 20px;
        }

        .social-links a {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #53665f;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d2dbd7;
          transition: 0.3s;
        }

        .social-links a:hover {
          background: #e83e71;
          border-color: #e83e71;
          color: white;
          transform: translateY(-2px);
        }

        /* Bottom */

        .footer-bottom {
          border-top: 1px solid #1f5518;
          padding: 17px 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .footer-bottom p {
          margin: 0;
          color: #9daaa5;
          font-size: 10px;
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        .footer-bottom-links a {
          color: #9daaa5;
          text-decoration: none;
          font-size: 10px;
        }

        .footer-bottom-links a:hover {
          color: #f18aa7;
        }


        /* ================================
           RESPONSIVE
        ================================= */

        @media (max-width: 950px) {

          .footer-main {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px 30px;
          }

        }


        @media (max-width: 600px) {

          .footer-main {
            grid-template-columns: 1fr;
            padding: 45px 7% 30px;
            gap: 30px;
          }

          .footer-about {
            max-width: 100%;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            padding: 17px 5%;
          }

        }


        @media (max-width: 400px) {

          .footer-main {
            padding-left: 6%;
            padding-right: 6%;
          }

          .footer-bottom-links {
            gap: 12px;
          }

        }
          .footer-socials {
  display: flex;
  gap: 12px;
  margin-top: 22px;
}

.footer-socials a {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(242, 248, 243, 0.1);
  color: white;
  text-decoration: none;
  font-size: 17px;
  font-weight: 600;
  transition: 0.3s;
}

.footer-socials a:hover {
  background: #f8b4c4;
  color: #1c4b18;
  transform: translateY(-3px);
}

      `}</style>


      <footer className="footer">

        {/* =========================
            MAIN FOOTER
        ========================== */}

        <div className="footer-main">


          {/* BRAND */}

          <div className="footer-column">

            <Link to="/" className="footer-logo">

              <div className="footer-logo-icon">
                🌸
              </div>

              <div className="footer-logo-text">
                <strong>Floral Vibes</strong>
                <span>
                  Fresh Flowers, Happier Moments
                </span>
              </div>

            </Link>


            <p className="footer-about">
              Bringing beautiful flowers and happier moments
              to your doorstep. Choose from our fresh collection
              and make every occasion a little more special.
            </p>

         <div className="footer-socials">
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            </div>
           
          </div>


          {/* QUICK LINKS */}

          <div className="footer-column">

            <h3>Quick Links</h3>

            <div className="footer-links">

              <Link to="/">Home</Link>

              <Link to="/shop">Shop Flowers</Link>

              <Link to="/about">About Us</Link>

              <Link to="/blog">Our Blog</Link>

              <Link to="/contact">Contact Us</Link>

            </div>

          </div>


          {/* CATEGORIES */}

          <div className="footer-column">

            <h3>Categories</h3>

            <div className="footer-links">

              <Link to="/shop?category=Roses">
                Roses
              </Link>

              <Link to="/shop?category=Tulips">
                Tulips
              </Link>

              <Link to="/shop?category=Sunflowers">
                Sunflowers
              </Link>

              <Link to="/shop?category=Mixed">
                Mixed Bouquets
              </Link>

              <Link to="/shop?category=Plants">
                Indoor Plants
              </Link>

            </div>

          </div>


          {/* CONTACT */}

          <div className="footer-column">

            <h3>Get In Touch</h3>

            <div className="footer-contact">

              <div className="contact-item">
                <MapPin size={15} />

                <span>
                  Roorkee, Uttarakhand, India
                </span>
              </div>


              <div className="contact-item">
                <Phone size={15} />

                <span>
                  +91 98765 43210
                </span>
              </div>


              <div className="contact-item">
                <Mail size={15} />

                <span>
                  hello@floralvibes.com
                </span>
              </div>

            </div>


            {/* NEWSLETTER */}

            <div className="newsletter">

              <p>
                Subscribe for flower tips,
                offers & new arrivals.
              </p>

              <div className="newsletter-box">

                <input
                  type="email"
                  placeholder="Your email address"
                />

                <button aria-label="Subscribe">
                  <ArrowRight size={16} />
                </button>

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            BOTTOM
        ========================== */}

        <div className="footer-bottom">

          <p>
            © 2026 Floral Vibes. All rights reserved.
          </p>

          <div className="footer-bottom-links">

            <Link to="/privacy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms & Conditions
            </Link>

          </div>

        </div>

      </footer>
    </>
  );
}

export default Footer;