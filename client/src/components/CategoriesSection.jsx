import React from 'react';
import { Carousel } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import fashionImg from '../assets/ca1.png';
import groceriesImg from '../assets/ca2.png';
import electronicsImg from '../assets/ca3.png';
import wellnessImg from '../assets/ca5.png';
import footwearImg from '../assets/ca6.png';
import beautyImg from '../assets/ca7.png';
import jewelleryImg from '../assets/c7.png';

import './Category.css';

const categories = [
  { name: "Men's Clothing", image: fashionImg },
  { name: "Women's Clothing", image: groceriesImg },
  { name: 'Footwear', image: electronicsImg },
  { name: 'Luggage & Bags', image: wellnessImg },
  { name: 'Jewellery', image: footwearImg },
  { name: 'Watches', image: beautyImg },
  { name: 'Beauty', image: jewelleryImg },
  { name: 'Electronics', image: jewelleryImg },
  { name: 'Home & Living', image: jewelleryImg },
  { name: 'Sports & Fitness', image: jewelleryImg },
  { name: 'Books & Stationery', image: jewelleryImg },
];

const groupCategories = (categories, itemsPerGroup) => {
  const groupedCategories = [];
  for (let i = 0; i < categories.length; i += itemsPerGroup) {
    groupedCategories.push(categories.slice(i, i + itemsPerGroup));
  }
  return groupedCategories;
};

const Category = () => {
  const itemsPerGroup = window.innerWidth >= 992 ? 4 : window.innerWidth >= 768 ? 3 : 2;
  const groupedCategories = groupCategories(categories, itemsPerGroup);

  return (
    <div className="categories-slider-wrapper my-5">
      <h2 className="text-center mb-4">Shop by Category</h2>
      <Carousel
        prevIcon={<ChevronLeft size={40} className="carousel-icon" />}
        nextIcon={<ChevronRight size={40} className="carousel-icon" />}
        indicators={false}
        interval={3000}
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