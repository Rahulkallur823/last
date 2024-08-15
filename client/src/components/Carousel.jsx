import React from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carousel.css'; // We'll create this file for custom styles

// Import images
import slideBanner1 from '../assets/slideBanner1.jpg';
import slideBanner2 from '../assets/slideBanner2.jpg';
import slideBanner3 from '../assets/slideBanner3.jpg';
import slideBanner4 from '../assets/slideBanner4.jpg';
import slideBanner5 from '../assets/slideBanner5.jpg';

const Carousel = () => {
  return (
    <div className="carousel-container mt-0">
      <BootstrapCarousel 
        interval={2000} 
        fade
        prevIcon={<ChevronLeft size={40} className="carousel-icon" />}
        nextIcon={<ChevronRight size={40} className="carousel-icon" />}
      >
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100"
            src={slideBanner1}
            alt="Slide 1"
          />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100"
            src={slideBanner2}
            alt="Slide 2"
          />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100"
            src={slideBanner3}
            alt="Slide 3"
          />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100"
            src={slideBanner4}
            alt="Slide 4"
          />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100"
            src={slideBanner5}
            alt="Slide 5"
          />
        </BootstrapCarousel.Item>
      </BootstrapCarousel>
    </div>
  );
};

export default Carousel;