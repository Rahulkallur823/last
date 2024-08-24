import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col">
              <h5>About Us</h5>
              <p>Learn more about our journey and values. We are committed to providing the best products and services to our customers.</p>
            </div>
            <div className="col">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="#shop">Shop</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div className="col">
              <h5>Contact Us</h5>
              <p><i className="fas fa-map-marker-alt"></i> 123 E-commerce St., New York, NY 10001</p>
              <p><i className="fas fa-phone"></i> +1 800 123 4567</p>
              <p><i className="fas fa-envelope"></i> info@ecommerce.com</p>
            </div>
            <div className="col">
              <h5>Stay Connected</h5>
              <div className="social-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <h5>Newsletter</h5>
              <form className="newsletter-form">
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2024 E-commerce. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
