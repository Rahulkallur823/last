import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useCategory from '../hooks/useCategory'; // Import your hook
import "./Category.css";

// Importing category images
import fashionImg from '../assets/ca1.png';
import groceriesImg from '../assets/ca2.png';
import electronicsImg from '../assets/ca3.png';
import wellnessImg from '../assets/ca5.png';
import footwearImg from '../assets/ca6.png';
import beautyImg from '../assets/ca7.png';
import jewelleryImg from '../assets/ca9.png';
import normal from '../assets/ca11.png';

// Static images corresponding to category slugs
const categoryImages = {
  "men-clothing": fashionImg,
  "women-clothing": groceriesImg,
  "footwear": electronicsImg,
  "luggage-bags": wellnessImg,
  "jewellery": footwearImg,
  "watches": beautyImg,
  "beauty": jewelleryImg,
  "handbags": normal,
  "kids-fashion": jewelleryImg,
  "sunglasses-frame": jewelleryImg,
};

const CategorySection = () => {
  const { categories, error } = useCategory(); // Using the hook to fetch categories
  const itemsPerGroup = 5; // Adjusted for larger screens
  const itemsPerGroupMobile = 3; // For mobile screens

  // Initialize state
  const [groupedCategories, setGroupedCategories] = useState([]);

  // Group categories based on screen width
  useEffect(() => {
    const groupCategories = () => {
      const isMobile = window.innerWidth < 576;
      const groupSize = isMobile ? itemsPerGroupMobile : itemsPerGroup;
      const groupedCategories = [];

      for (let i = 0; i < categories.length; i += groupSize) {
        groupedCategories.push(categories.slice(i, i + groupSize));
      }

      setGroupedCategories(groupedCategories);
    };

    groupCategories();

    const handleResize = () => {
      groupCategories();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [categories]);

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="categories-slider-wrapper">
      <Carousel
        prevIcon={<FaChevronLeft className="carousel-control-prev-icon" />}
        nextIcon={<FaChevronRight className="carousel-control-next-icon" />}
        indicators={false}
        interval={3000}
      >
        {groupedCategories.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="category-group">
              {group.map((category, idx) => (
                <Link
                  key={idx}
                  to={`/category/${category.slug}`}
                  className="category-card"
                >
                  <div className="image-wrapper">
                    <img
                      src={categoryImages[category.slug] || normal} // Default image if no match
                      alt={category.name}
                      className="category-image"
                    />
                  </div>
                  <div className="category-name">{category.name}</div>
                </Link>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CategorySection;
