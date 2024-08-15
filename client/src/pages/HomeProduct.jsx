import React, { useState, useEffect } from 'react';
import { Heart, Star, ShoppingCart } from 'react-feather';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductCard = ({ title, originalPrice, discountedPrice, discount, rating, image }) => {
  return (
    <div className="product-card">
      <div className="card-inner">
        <div className="card-front">
          <img src={image} alt={title} className="product-image" />
          {discount > 0 && (
            <span className="discount-tag">
              {discount}% OFF
            </span>
          )}
          <button className="wishlist-btn">
            <Heart size={18} />
          </button>
        </div>
        <div className="card-content">
          <h3 className="product-title">{title}</h3>
          <div className="price-container">
            <span className="discounted-price">₹{discountedPrice}</span>
            <span className="original-price">₹{originalPrice}</span>
          </div>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={i < Math.floor(rating) ? "#ffc107" : "none"} stroke="#ffc107" />
            ))}
          </div>
          <p className="delivery-info">Free delivery</p>
          <button className="add-to-cart-btn">
            <ShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/v1/product/get-products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch products.');
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="product-slider-container">
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {products.length > 0 ? (
        <Slider {...settings}>
          {products.map((p) => (
            <div key={p._id}>
              <ProductCard
                title={p.name}
                originalPrice={p.originalPrice}
                discountedPrice={p.discountedPrice}
                discount={p.discount}
                rating={p.rating}
                image={`http://localhost:7000/api/v1/product/product-photo/${p._id}`}
              />
            </div>
          ))}
        </Slider>
      ) : (
        !loading && <p className="no-products-text">No products available</p>
      )}
    </div>
  );
};

export default HomeProduct;