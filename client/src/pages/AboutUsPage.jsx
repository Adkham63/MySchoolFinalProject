import React from "react";
import myschool from "../assets/myschool.jpg";

const AboutUsPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="text-center text-2xl pt-10 text-gray-500">
        ABOUT <span className="text-gray-700 font-medium">US</span>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full h-auto md:max-w-[360px]"
          src={myschool}
          alt="About Us Banner"
        />

        <div className="my-10 flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to{" "}
            <span className="text-primary font-medium">
              My School Learning Centre
            </span>
            , your dedicated partner in achieving your English language goals.
            At My School, we understand the challenges students face in finding
            the right resources, connecting with experienced teachers, and
            maintaining consistent progress in their learning journey.
          </p>
          <p>
            <span className="text-primary font-medium">My School</span> is
            committed to excellence in English education. We continually work to
            enhance our platform, integrating innovative methods to improve your
            learning experience and provide top-notch educational support.
            Whether you're taking your first steps in English or preparing for
            IELTS, <span className="text-primary font-medium">My School</span>{" "}
            is here to guide you every step of the way.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at{" "}
            <span className="text-primary font-medium">
              My School Learning Centre
            </span>{" "}
            is to create a dynamic and supportive environment for every student.
            We aim to connect learners with exceptional teachers, making it
            easier for you to achieve your goals and excel in your English
            language journey.
          </p>
        </div>
      </div>
      <div className="text-xl my-4 text-center text-gray-700">
        <p>
          WHY <span className="text-gray-800 font-semibold">CHOOSE US:</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>
            Streamlined registration and scheduling for trial lessons that adapt
            to your busy lifestyle.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>
            Easy access to a network of experienced English teachers at all
            levels, from beginner to IELTS.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>
            Tailored learning paths and guidance to help you achieve your
            English language goals efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
