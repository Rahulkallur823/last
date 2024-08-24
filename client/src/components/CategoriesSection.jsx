import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "./Category.css";

import fashionImg from '../assets/ca1.png';
import groceriesImg from '../assets/ca2.png';
import electronicsImg from '../assets/ca3.png';
import wellnessImg from '../assets/ca5.png';
import footwearImg from '../assets/ca6.png';
import beautyImg from '../assets/ca7.png';
import jewelleryImg from '../assets/ca9.png';
import normal from '../assets/ca11.png';

const categories = [
  { name: "Men's Clothing", image: fashionImg },
  { name: "Women's Clothing", image: groceriesImg },
  { name: 'Footwear', image: electronicsImg },
  { name: 'Luggage & Bags', image: wellnessImg },
  { name: 'Jewellery', image: footwearImg },
  { name: 'Watches', image: beautyImg },
  { name: 'Beauty', image: jewelleryImg },
  { name: 'Handbags', image: normal },
  { name: "Kids' Fashion", image: jewelleryImg },
  { name: 'Sunglasses Frame', image: jewelleryImg },
];

const CategorySection = () => {
  const itemsPerGroup = 5; // Adjusted for larger screens
  const itemsPerGroupMobile = 3; // For mobile screens

  // Initialize state
  const [groupedCategories, setGroupedCategories] = useState(getGroupedCategories());

  // Determine the number of items per group based on screen width
  function getGroupedCategories() {
    const isMobile = window.innerWidth < 576; // Change the breakpoint as needed
    const groupSize = isMobile ? itemsPerGroupMobile : itemsPerGroup;
    const groupedCategories = [];

    for (let i = 0; i < categories.length; i += groupSize) {
      groupedCategories.push(categories.slice(i, i + groupSize));
    }

    return groupedCategories;
  }

  useEffect(() => {
    const handleResize = () => {
      setGroupedCategories(getGroupedCategories());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
                <div key={idx} className="category-card">
                  <div className="image-wrapper">
                    <img src={category.image} alt={category.name} className="category-image" />
                  </div>
                  <div className="category-name">{category.name}</div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CategorySection;
