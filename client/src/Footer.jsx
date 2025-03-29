import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

const Footer = () => {
  const { user } = useContext(UserContext) || {};
  const location = useLocation();

  // Navigation items
  const menuItems = [
    { name: "Home Page", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Contact us", path: "/contact" },
  ];

  return (
    <footer className="bg-white py-12 mt-40">
      <div className="max-w-screen-xl mx-auto px-8 md:px-10 text-sm">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8">
          {/* Left Section */}
          <div>
            <p className="text-gray-600 leading-7 text-justify mb-6">
              My School Learning Centre, welcome, here we are we give students
              the opportunity to own in teaching English achieve their goals.
              Our team attracts expert teachers from dedicated and beginners to
              making a supportive learning environment for all levels allows
              Ielts to preparation.
            </p>
          </div>

          {/* Center Section */}
          <div>
            <p className="text-xl font-medium mb-5">Company</p>
            <ul className="flex flex-col gap-3 text-gray-600">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`transition duration-300 ease-in-out ${
                      location.pathname === item.path
                        ? "text-primary font-semibold"
                        : "text-gray-600 hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <p className="text-xl font-medium mb-5">Get in touch</p>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li>
                <a
                  href="tel:+998995176400"
                  className="hover:text-primary transition duration-300 ease-in-out"
                >
                  +998 (99) 517-64-00
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/myschooluz"
                  className="hover:text-primary transition duration-300 ease-in-out"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @myschooluz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12">
          <hr className="border-gray-200 mb-5" />
          <p className="text-center text-gray-600 text-sm">
            Copyright © 2025 My School LC-All rights protected.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
