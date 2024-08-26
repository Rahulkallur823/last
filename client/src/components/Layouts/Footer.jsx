import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-5 bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>About Us</h5>
            <p>
              We are a leading e-commerce platform offering a wide range of products at affordable prices. Our mission is to provide a seamless shopping experience.
            </p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Home</a></li>
              <li><a href="#" className="text-white">Shop</a></li>
              <li><a href="#" className="text-white">About Us</a></li>
              <li><a href="#" className="text-white">Contact Us</a></li>
              <li><a href="#" className="text-white">FAQ</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><span className="text-white">Email:</span> support@ecommerce.com</li>
              <li><span className="text-white">Phone:</span> +1 (555) 123-4567</li>
              <li><span className="text-white">Address:</span> 123 E-commerce St, Online City, World</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" className="text-white me-2"><FaFacebook size={24} /></a>
              <a href="https://twitter.com" className="text-white me-2"><FaTwitter size={24} /></a>
              <a href="https://instagram.com" className="text-white me-2"><FaInstagram size={24} /></a>
              <a href="https://linkedin.com" className="text-white"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>
        <hr className="bg-white" />
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="mb-0">© 2024 E-commerce Platform. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
