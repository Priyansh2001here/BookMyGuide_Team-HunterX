import React from "react";
import "./Services.css";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';

function Services() {
    const currCityName =  window.localStorage.getItem("currentCity")
  return (
    <div className="explore" style={{ marginBottom: "20px" }}>
      <h3 style={{ marginBottom: "20px", color: "#3e3e3e" }}>
      Services in {currCityName}
      </h3>
      <Swiper
        spaceBetween={15}
        slidesPerView={2.2}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => ''}
      >
        <div className="swiper-wrapper">
          <SwiperSlide>
          <div className="explorePlace flex flex-alignCenter">
            <img src="resterauntIcon.svg" alt="" />
            <p>Restaurants</p>
           </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="explorePlace flex flex-alignCenter">
            <img src="mallIcon.svg" alt="" />
            <p>Malls</p>
           </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="explorePlace flex flex-alignCenter">
            <img src="hotelIcon.svg" alt="" />
            <p>Hotels</p>
           </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="explorePlace flex flex-alignCenter">
            <img src="resterauntIcon.svg" alt="" />
            <p>Others</p>
           </div>
          </SwiperSlide>
        </div>  
      </Swiper>
    </div>
  );
}

export default Services;
