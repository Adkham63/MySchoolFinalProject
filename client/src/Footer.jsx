import React from "react";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8 my-10 mt-40 text-sm">
        {/*-----Left Section-----*/}
        <div>
          <p className="w-full md:w-2/3 text-gray-600 leading-6 text-justify">
            Welcome to My School Learning Centre, where we empower students to
            achieve their goals in English language education. Our team of
            expert teachers is dedicated to creating an engaging and supportive
            learning environment for all levels, from beginners to IELTS
            preparation.
          </p>
        </div>

        {/*-----Center Section-----*/}
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/*-----Right Section-----*/}
        <div>
          <p className="text-xl font-medium mb-5">Get in touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+998 (99) 517-64-00</li>
            <li>@myschooluz</li>
          </ul>
        </div>
      </div>
      <div>
        {/*-----Copyright Text-----*/}
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2025 My School LC - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
