import React from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carousel.css';

// Import images
import slideBanner1 from '../assets/slideBanner1.jpg';
import slideBanner2 from '../assets/slideBanner2.jpg';
import slideBanner3 from '../assets/slideBanner3.jpg';
import slideBanner4 from '../assets/slideBanner4.jpg';
import slideBanner5 from '../assets/slideBanner5.jpg';

const Carousel = () => {
  return (
    <div className="carousel-container">
      <BootstrapCarousel
        interval={5000}
        indicators
        controls
        prevIcon={
          <div className="carousel-icon">
            <ChevronLeft size={24} />
          </div>
        }
        nextIcon={
          <div className="carousel-icon">
            <ChevronRight size={24} />
          </div>
        }
      >
        <BootstrapCarousel.Item>
          <img src={slideBanner1} alt="Slide 1" />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img src={slideBanner2} alt="Slide 2" />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img src={slideBanner3} alt="Slide 3" />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img src={slideBanner4} alt="Slide 4" />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img src={slideBanner5} alt="Slide 5" />
        </BootstrapCarousel.Item>
      </BootstrapCarousel>
    </div>
  );
};

export default Carousel;