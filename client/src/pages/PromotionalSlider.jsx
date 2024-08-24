import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { FaShoppingCart, FaPlane, FaPepperHot, FaBug } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PromotionalSlider.css';

// Import images
import slideBanner2 from '../assets/amazonbanner4.jpg';
import promotionslider1 from '../assets/amazonbanner2.jpg';
import promotionslider2 from '../assets/amazonbanner1.jpg';
import repellants from '../assets/amazonbanner5.jpg';

const PromotionalSlider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: 'BEST DEALS',
      subtitle: 'BEST STAIN REMOVAL',
      buttonText: 'Order now',
      icon: <FaShoppingCart size={20} />,
      image: slideBanner2,
    },
    {
      title: 'Travelling Somewhere?',
      subtitle: 'UP TO 60% OFF',
      buttonText: 'Order Now',
      icon: <FaPlane size={20} />,
      image: promotionslider1,
    },
    {
      title: 'UP TO 50% OFF',
      subtitle: 'Spice things up!',
      buttonText: 'Explore',
      icon: <FaPepperHot size={20} />,
      image: promotionslider2,
    },
    {
      title: 'UPTO 30% OFF',
      subtitle: 'Repellant Fest',
      buttonText: 'Explore',
      icon: <FaBug size={20} />,
      image: repellants,
    },
  ];

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      className="promotional-slider"
    >
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx}>
          <div className="slide-content">
            <img
              src={slide.image}
              alt={slide.title}
              className="slide-image"
              loading="lazy"
            />
            <Carousel.Caption className="slide-caption">
              <button className="btn btn-light">
                {slide.icon} {slide.buttonText}
              </button>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PromotionalSlider;