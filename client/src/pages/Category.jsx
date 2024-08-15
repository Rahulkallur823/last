import React from 'react';
import { Carousel } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import fashionImg from '../assets/ca1.png';
import groceriesImg from '../assets/ca2.png';
import electronicsImg from '../assets/ca3.png';
import wellnessImg from '../assets/ca5.png';
import footwearImg from '../assets/ca6.png';
import beautyImg from '../assets/ca7.png';
import jewelleryImg from '../assets/chips.png';

import './Categorynormal.css';

const categories = [
  { name: "Men's Clothing", image: fashionImg },
  { name: "Women's Clothing", image: groceriesImg },
  { name: 'Footwear', image: electronicsImg },
  { name: 'Luggage & Bags', image: wellnessImg },
  { name: 'Jewellery', image: footwearImg },
  { name: 'Watches', image: beautyImg },
  { name: 'Beauty', image: jewelleryImg },
  { name: 'Beauty', image: jewelleryImg },
  { name: 'Beauty', image: jewelleryImg },
  { name: 'Beauty', image: jewelleryImg },
  { name: 'Beauty', image: jewelleryImg },
  // Add more categories as needed
];

// Function to group categories into sets of 3 or 4
const groupCategories = (categories, itemsPerGroup) => {
  const groupedCategories = [];
  for (let i = 0; i < categories.length; i += itemsPerGroup) {
    groupedCategories.push(categories.slice(i, i + itemsPerGroup));
  }
  return groupedCategories;
};

const Category = () => {
  const itemsPerGroup = 4; // Change this to 3 if you prefer 3 items per slide
  const groupedCategories = groupCategories(categories, itemsPerGroup);

  return (
    <div className="categories-slider-wrapper">
      <Carousel
        prevIcon={<FaArrowLeft size={30} color="#000" />}
        nextIcon={<FaArrowRight size={30} color="#000" />}
        indicators={false}
        interval={3000}  // Set the interval to 3000ms (3 seconds)
      >
        {groupedCategories.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="category-group">
              {group.map((category, idx) => (
                <div className="category-card" key={idx}>
                  <div className="image-wrapper">
                    <img src={category.image} alt={category.name} className="category-image" />
                  </div>
                  <p className="category-name">{category.name}</p>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Category;
