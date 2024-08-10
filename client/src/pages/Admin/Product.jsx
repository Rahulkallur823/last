import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getallproducts = async () => {
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
    getallproducts();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {products.length > 0 ? (
        <div className="row">
          {products.map((p) => (
            <div className="col-md-3 mb-4" key={p._id}>
              <Link
                to={`/admin/manage-products/${p.slug}`}
                className="text-decoration-none text-dark"
              >
                <div className="product-card">
                  <div className="product-img-wrapper">
                    <img
                      src={`http://localhost:7000/api/v1/product/product-photo/${p._id}`}
                      className="product-img"
                      alt={p.name}
                    />
                    {p.discount && (
                      <div className="discount-badge">
                        {p.discount}%
                      </div>
                    )}
                  </div>
                  <div className="product-body">
                    <div className="product-title">{p.name}</div>
                    <div className="product-status">
                      {p.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </div>
                    <div className="product-rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-${i < p.rating ? 'warning' : 'secondary'}`} style={{ fontSize: '16px' }}>
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="product-pricing">
                    {p.originalPrice && (
                        <div className="original-price">Rs {p.originalPrice}</div>
                      )}
                     
                      {p.discountedPrice && (
                        <div className="discounted-price">Rs {p.discountedPrice}</div>
                      )}
                      
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Product;
  