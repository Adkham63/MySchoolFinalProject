import React from "react";
import contact from "../assets/contact.png";

const Contact = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        {/* Contact Image */}
        <img
          className="w-full md:max-w-[360px] shadow-lg rounded-lg"
          src={contact}
          alt="Contact"
        />

        {/* Contact Information */}
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-700">
            Our Learning Center
          </p>
          <p className="text-gray-600 leading-relaxed">
            123 Elm Street <br />
            Suite 101, Springfield, USA
          </p>
          <p className="text-gray-600">
            Tel:{" "}
            <span className="font-medium text-gray-700">(123) 456‑7890</span>
            <br />
            Email:{" "}
            <span className="font-medium text-gray-700">
              info@learncenter.com
            </span>
          </p>
          <p className="font-semibold text-lg text-gray-700">Join Our Team</p>
          <p className="text-gray-600">
            Become a part of our passionate teaching community and help students
            excel in their English learning journey.
          </p>
          <button className="border border-primary px-8 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-lg">
            Explore Opportunities
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
