import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import { FaStar, FaShoppingCart, FaBolt } from 'react-icons/fa';
import './ProductDetails.css';
import "./relatedproduct.css";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
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
      if (data.success) {
        setProduct(data.product);
        setMainImage(`http://localhost:7000/api/v1/product/product-photo/${data.product._id}`);
        setThumbnails(data.product.images || []);
        getsimilarproduct(data.product._id, data.product.category._id);
      } else {
        console.error('Error fetching product:', data.message);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const getsimilarproduct = async (pid, cid) => {
    try {
      const response = await fetch(`http://localhost:7000/api/v1/product/similar-product/${pid}/${cid}`);
      const data = await response.json();
      if (data.success) {
        setRelatedProducts(data.products);
      } else {
        console.error('Error fetching related products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
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
      stars.push(
        <FaStar key={i} className={i <= rating ? 'filled-star' : 'empty-star'} />
      );
    }
    return stars;
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
            {renderStars(product.rating)}
            <span className="product-reviews">(1,234 ratings)</span>
          </div>
          <div className="product-price">
            <span className="discounted-price">₹{product.discountedPrice}</span>
            <span className="original-price">₹{product.price}</span>
            <span className="discount">{product.discount}% off</span>
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
      <div className="related-products-section">
        <h2>Similar Products</h2>
        <div className="related-products-grid">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((p) => (
              <Link to={`/product/${p.slug}`} className="product-link" key={p._id}>
                <div className="related-product-card">
                  <div className="related-product-image-container">
                    <img
                      src={`http://localhost:7000/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="related-product-image"
                    />
                    {p.discount > 0 && (
                      <span className="related-product-discount-badge">{p.discount}% OFF</span>
                    )}
                  </div>
                  <div className="related-product-content">
                    <h3 className="related-product-name">{p.name}</h3>
                    <div className="related-product-price-container">
                      <span className="related-product-discounted-price">₹{p.discountedPrice}</span>
                      {p.discount > 0 && (
                        <span className="related-product-original-price">₹{p.price}</span>
                      )}
                    </div>
                    <div className="related-product-rating">
                      {renderStars(p.rating)}
                      <span className="related-product-reviews">({p.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-related-products">No related products found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
