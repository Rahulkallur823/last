import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaBolt } from 'react-icons/fa';
import './ProductDetails.css'; // Make sure to update this CSS file with the styles provided earlier

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const response = await fetch(`http://localhost:7000/api/v1/product/get-product/${params.slug}`);
      const data = await response.json();
      setProduct(data?.product);
      setMainImage(`http://localhost:7000/api/v1/product/product-photo/${data?.product._id}`);
      setThumbnails(data?.product?.images || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageZoom = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
    setIsZoomed(true);
  };

  const handleImageZoomOut = () => {
    setIsZoomed(false);
  };

  const handleThumbnailClick = (index) => {
    setSelectedThumbnail(index);
    setMainImage(`http://localhost:7000/api/v1/product/product-photo/${product._id}?index=${index}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  };

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (product.originalPrice && product.discountedPrice) {
      const discount = ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <Layout>
      <div className="product-details-container">
        <div className="product-image-container">
          <div
            className={`product-main-image-wrapper ${isZoomed ? 'zoomed' : ''}`}
            onMouseEnter={handleImageZoom}
            onMouseLeave={handleImageZoomOut}
            onMouseMove={handleImageZoom}
          >
            <img
              src={mainImage}
              alt={product.name}
              className="product-main-image"
              ref={imageRef}
            />
            {isZoomed && (
              <div
                className="product-zoom-overlay"
                style={{
                  backgroundImage: `url(${mainImage})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            )}
          </div>
          <div className="product-image-gallery">
            {thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={`http://localhost:7000/api/v1/product/product-photo/${product._id}?index=${index}`}
                alt={`Thumbnail ${index}`}
                className={index === selectedThumbnail ? "active" : ""}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
        <div className="product-info-container">
          <h1 className="product-name">{product.name}</h1>
          <div className="product-rating">
            {renderStars(4.5)} 
            <span className="product-reviews">(1,234 ratings)</span>
          </div>
          <div className="product-price">
            <span className="discounted-price">₹{product.discountedPrice}</span>
            <span className="original-price">₹{product.originalPrice}</span>
            <span className="discount">{calculateDiscount()}% off</span>
          </div>
          <div className="product-description">
            <h3>About this item</h3>
            <p>{product.description}</p>
            <p><strong>Category:</strong> {product?.category?.name}</p>
            <p><strong>Availability:</strong> {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
          </div>
          <div className="product-actions">
            <button className="add-to-cart">
              <FaShoppingCart /> Add to Cart
            </button>
            <button className="buy-now">
              <FaBolt /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;