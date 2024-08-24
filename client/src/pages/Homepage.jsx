import React from 'react';
import Layout from '../components/Layouts/Layout.jsx';
import Carousel from '../components/Carousel.jsx';
import CategoriesSection from '../components/CategoriesSection.jsx';
import HomeProduct from './HomeProduct.jsx';
import PromotionalSlider from './PromotionalSlider.jsx';
import "./home.css";

const Home = () => {
  return (
    <Layout>
      <div className="home-container">
        {/* Carousel */}
        <section className="carousel-section">
          <Carousel />
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="container">
            <h2 className="section-title">Shop by Category</h2>
            <CategoriesSection />
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="featured-products-section">
          <div className="container">
            {/* <h2 className="section-title">Featured Products</h2> */}
            <HomeProduct />
          </div>
        </section>

        {/* Promotional Section */}
        <section className="promotional-section">
          <div className="container">
            <h2 className="section-title">Special Offers</h2>
            <PromotionalSlider />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;