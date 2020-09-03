import 'slick-carousel/slick/slick.css';
import React from 'react';
import Slider from 'react-slick';
import { ReactComponent as ArrowNext } from '../../images/icons/arrow-next.svg';
import { ReactComponent as ArrowPrev } from '../../images/icons/arrow-prev.svg';

import './styles.scss';

const SampleNextArrow = props => {
  const { className, onClick } = props;
  return (
    <button className={className} onClick={onClick} type="button">
      <ArrowNext className="carousel__arrow" title="Следующий слайд" />
      <span className="visually-hidden">Следующий слайд</span>
    </button>
  );
};

const SamplePrevArrow = props => {
  const { className, onClick } = props;
  return (
    <button className={className} onClick={onClick} type="button">
      <ArrowPrev className="carousel__arrow" title="Предыдущий слайд" />
      <span className="visually-hidden">Предыдущий слайд</span>
    </button>
  );
};

const DEFAULT_SETTINGS = {
  dots: true,
  infinite: true,
  centerMode: true,
  centerPadding: '56px',
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  lazyLoad: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        centerMode: false,
        slidesToShow: 1,
      },
    },
  ],
};

const Carousel = ({ children }) => {
  return (
    <div className="carousel">
      <Slider {...DEFAULT_SETTINGS}>{children}</Slider>
    </div>
  );
};

export default Carousel;
