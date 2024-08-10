import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layouts/Layout.jsx';
import Carousel from '../components/Carousel.jsx';
import CategoriesSection from '../components/CategoriesSection.jsx';
import { Star } from 'lucide-react';

const Home = () => {
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

  return (
    <Layout>
      <div className="container-fluid p-0">
        {/* Carousel */}
        <div className="carousel-container" style={{ width: '100%', padding: 0 }}>
          <Carousel />
        </div>

        {/* Categories Section */}
        <CategoriesSection />

        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 p-0">
            <div className="sidebar bg-light border-end" style={{
              position: 'sticky',
              top: '0',
              height: '100vh',
              overflowY: 'auto',
              padding: '1rem',
              width: '100%',
              zIndex: 1
            }}>
              <h1 className="text-center">Filter by Category</h1>
              {/* Add filter content here */}
            </div>
          </div>

          {/* Main content */}
          <div className="col-md-9">
            <div className="container" style={{ paddingTop: '1rem', minHeight: '100vh' }}>
              <h4 className="text-center">All Products</h4>
              {loading && <p>Loading...</p>}
              {error && <p className="text-danger">{error}</p>}
              {products.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                  {products.map((p) => (
                    <div className="col" key={p._id}>
                      <Link
                        to={`/admin/product/${p.slug}`}
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
                              <span className="discount-badge">
                                {p.discount}% OFF
                              </span>
                            )}
                          </div>
                          <div className="product-body">
                            <h5 className="product-title">{p.name}</h5>
                            <p className={`product-status ${p.quantity > 0 ? 'text-success' : 'text-danger'}`}>
                              {p.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                            </p>
                            <div className="product-rating">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`text-${i < p.rating ? 'warning' : 'secondary'} me-1`}
                                  style={{ width: '16px', height: '16px' }}
                                />
                              ))}
                            </div>
                            <div className="product-pricing">
                              <span className="original-price">Rs {p.originalPrice}</span>
                              <span className="discounted-price">Rs {p.discountedPrice}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No products available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
