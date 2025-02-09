import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaTelegramPlane } from "react-icons/fa";
import contact from "../assets/contact.png";

const Contact = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <div className="bg-gray-50 py-16">
      {/* Header */}
      <div className="text-center text-3xl font-semibold text-gray-700 mb-12">
        <p>
          CONTACT <span className="text-gray-900">US</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center gap-12 md:flex-row items-center max-w-5xl mx-auto px-6">
        {/* Contact Image */}
        <img
          className="object-cover w-full h-full rounded-lg shadow-lg md:w-1/2 lg:w-[500px] transition-transform duration-300 hover:scale-105"
          src={contact}
          alt="Contact"
        />

        {/* Contact Information */}
        <div className="flex flex-col justify-center items-start gap-6 p-8 bg-white shadow-lg rounded-xl max-w-lg w-full">
          <p className="font-semibold text-2xl text-gray-800">
            Our Learning Center
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.google.com/maps/place/My+School+3rd+branch/@41.270852,69.2014723,17.25z/data=!4m14!1m7!3m6!1s0x38ae8b3f93f4966f:0x46154ae9b74663fd!2sChilonzor+Metro!8m2!3d41.2743237!4d69.2040158!16s%2Fg%2F11fd3j4l_s!3m5!1s0x38ae8b532d421f2d:0x5bb464a7c292b83!8m2!3d41.2698033!4d69.2010674!16s%2Fg%2F11pr2mqryn?entry=ttu&g_ep=EgoyMDI1MDExMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-5 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              <FaMapMarkerAlt className="text-lg" />
              г. Ташкент, метро Чиланзар - 17 кв.
            </a>
          </div>

          <div className="flex items-center">
            <a
              href="tel:+998995176400"
              className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-5 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              <FaPhoneAlt className="text-lg" />
              +998 (99) 517-64-00
            </a>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-semibold text-lg text-gray-800">Telegram:</p>
            <a
              href="https://t.me/myschooluz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-5 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              <FaTelegramPlane className="text-lg" />
              myschooluz
            </a>
            <a
              href="https://t.me/myschool_exam_department"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-5 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              <FaTelegramPlane className="text-lg" />
              myschool_exam_department
            </a>
          </div>

          <p className="font-semibold text-2xl text-gray-800 mt-6">
            Join Our Team
          </p>
          <p className="text-gray-700">
            Become a part of our dedicated teaching community and contribute to
            empowering students with international English language skills.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-6 w-full border border-blue-700 bg-blue-700 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-800 transition-transform duration-300 shadow-md hover:scale-105"
          >
            Explore Opportunities
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
