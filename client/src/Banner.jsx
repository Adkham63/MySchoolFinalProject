import React from "react";
import { useNavigate } from "react-router-dom";
import commonImg from "../src/assets/common.jpg";
import commonImg2 from "../src/assets/common2.jpg";
import commonImg3 from "../src/assets/common3.jpg";

import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-20 my-5 mx-5 md:mx-15 lg:mx-16 xl:mx-20 h-full">
      {/* Left Side */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 font-semibold text-white max-w-full">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-tight">
            Learn English Confidently with My School LC!
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4">
            Our Learning Centre offers personalized lessons taught by certified
            instructors for students at all levels, from beginner to IELTS
            preparation. Join us to master English skills for academic, travel,
            or professional success.
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4">
            Sign up now and enjoy trial lessons, flexible schedules, and access
            to expert teaching tailored to your goals.
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="bg-white text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 px-10 py-4 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Get Started Today
        </button>
      </div>

      {/* Right Side (Slider) */}
      <div className="flex items-center justify-center md:w-1/2 lg:w-[500px] w-full h-full">
        <div className="flex items-center justify-center w-full h-full mt-20 ml-10 mb-10">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            navigation={false} // Hide arrows
            autoplay={{ delay: 3000 }}
            className="w-full"
          >
            <SwiperSlide>
              <img
                className="object-cover w-full h-full rounded-lg m-auto"
                src={commonImg}
                alt="Learning Centre Banner"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="object-cover w-full h-full rounded-lg m-auto"
                src={commonImg2}
                alt="Learning Centre Banner 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="object-cover w-full h-full rounded-lg m-auto"
                src={commonImg3}
                alt="Learning Centre Banner 3"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Banner;
