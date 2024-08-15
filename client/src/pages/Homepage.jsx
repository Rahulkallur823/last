import React from 'react';
import Layout from '../components/Layouts/Layout.jsx';
import Carousel from '../components/Carousel.jsx';
import CategoriesSection from '../components/CategoriesSection.jsx';
import HomeProduct from './HomeProduct.jsx';

const Home = () => {
  return (
    <Layout>
      <div className="container-fluid p-0">
        {/* Carousel */}
        <Carousel />
        
        {/* Categories Section */}
        <CategoriesSection />
        
        {/* Product Section */}
        < HomeProduct/>
      </div>
    </Layout>
  );
};

export default Home;