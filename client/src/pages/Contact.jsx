import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTelegramPlane,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";
import contact from "../assets/contact.png";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Biz bilan <span className="text-blue-600">bog'lanish</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Har qanday savol yoki taklifingiz bo'lsa, biz bilan bog'laning
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-center gap-12 items-center max-w-6xl mx-auto px-6">
        {/* Contact Image */}
        <div className="w-full lg:w-1/2">
          <img
            className="w-full h-auto rounded-xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
            src={contact}
            alt="Contact Our Learning Center"
          />
        </div>

        {/* Contact Information */}
        <div className="w-full lg:w-1/2 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
            Bizning O'quv Markazimiz
          </h2>

          {/* Contact Cards */}
          <div className="space-y-5">
            {/* Address */}
            <a
              href="https://www.google.com/maps/place/My+School+3rd+branch/@41.270852,69.2014723,17.25z/data=!4m14!1m7!3m6!1s0x38ae8b3f93f4966f:0x46154ae9b74663fd!2sChilonzor+Metro!8m2!3d41.2743237!4d69.2040158!16s%2Fg%2F11fd3j4l_s!3m5!1s0x38ae8b532d421f2d:0x5bb464a7c292b83!8m2!3d41.2698033!4d69.2010674!16s%2Fg%2F11pr2mqryn?entry=ttu&g_ep=EgoyMDI1MDExMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-300 group"
            >
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Manzil</h3>
                <p className="text-gray-600">
                  Toshkent shahri, Chilonzor metrosi - 17 kv.
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+998995176400"
              className="flex items-start gap-4 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-all duration-300 group"
            >
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
                <FaPhoneAlt className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Telefon</h3>
                <p className="text-gray-600">+998 (99) 517-64-00</p>
              </div>
            </a>

            {/* Working Hours */}
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaClock className="text-purple-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Ish vaqti</h3>
                <p className="text-gray-600">Dushanba-Shanba: 9:00 - 20:00</p>
              </div>
            </div>

            {/* Telegram Channels */}
            <div className="space-y-3 mt-6">
              <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                <FaTelegramPlane className="text-blue-400" />
                Telegram kanallarimiz
              </h3>

              <a
                href="https://t.me/myschooluz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-lg transition-all duration-300"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaTelegramPlane className="text-blue-500" />
                </div>
                <span>@myschooluz</span>
              </a>

              <a
                href="https://t.me/myschool_exam_department"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-lg transition-all duration-300"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaTelegramPlane className="text-blue-500" />
                </div>
                <span>@myschool_exam_department</span>
              </a>
            </div>

            {/* Email (optional) */}
            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl mt-6">
              <div className="p-3 bg-orange-100 rounded-lg">
                <FaEnvelope className="text-orange-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Email</h3>
                <p className="text-gray-600">info@myschoollc.uz</p>
              </div>
            </div>
          </div>

          {/* Join Us Section */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Jamoamizga Qo'shiling
            </h2>
            <p className="text-gray-600 mb-6">
              Bizning bag'ishlangan o'quv hamjamiyat bir qismi bo'ling va hissa
              qo'shing talabalarni xalqaro ingliz tili ko'nikmalariga ega
              bo'lish.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Imkoniyatlarni O'rganing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
