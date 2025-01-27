import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpeg'
import image3 from '../assets/image3.jpeg'
import image4 from "../assets/sushiimage.jpg"

function Carousel(){
  const images = [image4, image3, image1, image2];

  return (
<div className="carousel-container w-full max-w-8xl mx-auto object-contain">
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 4000 }}
    loop
    className="mySwiper"
  >
    {images.map((image, index) => (
      <SwiperSlide key={index}>
        <img
          src={image}
          alt={`Slide ${index + 1}`}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </SwiperSlide>
    ))}
  </Swiper>
</div>
  );
};

export default Carousel;
