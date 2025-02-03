import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaTelegramPlane } from "react-icons/fa";
import contact from "../assets/contact.png";

const Contact = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>
      {/* Main Content */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm max-w-4xl mx-auto">
        {/* Contact Image */}
        <img
          className="object-cover w-full h-full rounded-lg m-auto md:w-1/2 lg:w-[500px]"
          src={contact}
          alt="Contact"
        />

        {/* Contact Information */}
        <div className="flex flex-col justify-center items-start gap-6 p-6 bg-white shadow-md rounded-lg">
          <p className="font-semibold text-xl text-gray-700">
            Our Learning Center
          </p>
          <div className="flex items-center text-gray-600 leading-relaxed">
            <a
              href="https://www.google.com/maps/place/My+School+3rd+branch/@41.270852,69.2014723,17.25z/data=!4m14!1m7!3m6!1s0x38ae8b3f93f4966f:0x46154ae9b74663fd!2sChilonzor+Metro!8m2!3d41.2743237!4d69.2040158!16s%2Fg%2F11fd3j4l_s!3m5!1s0x38ae8b532d421f2d:0x5bb464a7c292b83!8m2!3d41.2698033!4d69.2010674!16s%2Fg%2F11pr2mqryn?entry=ttu&g_ep=EgoyMDI1MDExMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
            >
              <FaMapMarkerAlt className="text-lg" />
              г. Ташкент, метро Чиланзар - 17 кв.
              <br />
              Ориентир: на против Сингапурского инс, Тошкент, 100135
            </a>
          </div>
          <div className="flex items-start text-gray-600">
            <a
              href="tel:+998995176400"
              className="flex items-center gap-3 bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
            >
              <FaPhoneAlt className="text-lg" />
              +998 (99) 517-64-00
            </a>
          </div>
          <div className="flex flex-col gap-4 text-gray-600">
            <p className="font-medium text-gray-700">Telegram:</p>
            <a
              href="https://t.me/myschooluz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 text-primary font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
            >
              <FaTelegramPlane className="text-lg" />
              myschooluz
            </a>
            <a
              href="https://t.me/myschool_exam_department"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 text-primary font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
            >
              <FaTelegramPlane className="text-lg" />
              myschool_exam_department
            </a>
          </div>
          <p className="font-semibold text-xl text-gray-700">Join Our Team</p>
          <p className="text-gray-600">
            Become a part of our passionate teaching community and help students
            excel in their English learning journey.
          </p>
          <button
            onClick={() => navigate("/register")} // Navigate to the registration page
            className="border border-primary px-8 py-3 text-sm font-medium text-white bg-primary hover:bg-blue-100 hover:text-primary transition-all duration-300 rounded-lg"
          >
            Explore Opportunities
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
