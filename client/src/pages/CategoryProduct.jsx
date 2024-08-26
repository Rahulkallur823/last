import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import Pagination from "@mui/material/Pagination";
import { Star } from "react-feather";
import { Loader2 } from "lucide-react";

const CategoryProduct = () => {
  const params = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:7000/api/v1/product/product-category/${params.slug}?page=${page}`, {
          method: "GET",
        }
      );
      const data = await response.json();
      setCategory(data?.category);
      setProducts(data?.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to load products. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">Category results found: {products?.length}</h6>

        {loading && <p className="loading-text"><Loader2/></p>}
        {error && <p className="error-text">{error}</p>}
        {products.length > 0 ? (
          <>
            <div className="product-grid">
              {products.map((p) => (
                <div key={p._id} className="product-item">
                  <Link to={`/product/${p.slug}`} className="product-link">
                    <ProductCard
                      title={p.name}
                      originalPrice={p.price}
                      discountedPrice={p.discountedPrice}
                      discount={p.discount}
                      rating={p.rating}
                      image={`http://localhost:7000/api/v1/product/product-photo/${p._id}`}
                      inStock={p.quantity > 0}
                    />
                  </Link>
                </div>
              ))}
            </div>
            <Pagination
              count={10} // This should be dynamic based on the total count of products
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </>
        ) : (
          !loading && <p className="text-center">No products found.</p>
        )}
      </div>
    </Layout>
  );
};

const ProductCard = ({ title, originalPrice, discountedPrice, discount, rating, image, inStock }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={image} alt={title} className="product-image" />
        {discount > 0 && (
          <span className="discount-badge">{discount}% OFF</span>
        )}
      </div>
      <div className="card-content">
        <h3 className="product-title">{title}</h3>
        <div className="price-container">
          <span className="discounted-price" style={{ fontSize: '1rem', fontWeight: 'bold', color: '#0f1111' }}>
            ₹ {discountedPrice}
          </span>
          {originalPrice && (
            <span className="original-price" style={{ fontSize: '1rem', color: '#999', textDecoration: 'line-through' }}>
              ₹ {originalPrice}
            </span>
          )}
        </div>
        <p className="stock-info">{inStock ? 'In Stock' : 'Out of Stock'}</p>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill={i < Math.floor(rating) ? "#FFA41C" : "none"} stroke="#FFA41C" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
