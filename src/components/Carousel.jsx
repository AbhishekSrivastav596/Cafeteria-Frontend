import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import image1 from "../assets/food1.jpg";
import image2 from "../assets/food2.jpg";
import image3 from "../assets/food3.jpg";
import image4 from "../assets/food4.jpg";

const Carousel = () => {
  const images = [image1, image2, image3, image4];

  return (
<div className="carousel-container w-full max-w-8xl mx-auto">
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
