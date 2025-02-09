import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi"; // Hamburger icons

const Header = () => {
  const { user } = useContext(UserContext) || {};
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="relative flex justify-between items-center p-6 bg-white mb-6 shadow-xl rounded-b-2xl">
      {/* Branding */}
      <Link to="/" className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-black" // Black color for logo
          aria-label="Brand Icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
        <span className="font-bold text-2xl text-black">My School LC</span>{" "}
        {/* Black color for the brand name */}
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden sm:flex items-center gap-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`text-lg font-medium transition-all duration-300 px-4 py-2 rounded-md ${
              location.pathname === item.path
                ? "text-white bg-primary"
                : "text-black hover:text-white hover:bg-primary/80" // Darker hover for non-active pages
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Toggle Button */}
      <div className="sm:hidden">
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="text-black focus:outline-none" // Black color for button
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <HiOutlineX className="w-8 h-8" />
          ) : (
            <HiOutlineMenuAlt3 className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* User Account Section */}
      <Link
        to={user ? "/account" : "/login"}
        className="flex items-center gap-2 border border-primary/50 rounded-full py-2 px-4 transition-all duration-300 hover:bg-primary/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-black" // Black color for the user icon
          aria-label="User Icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div className="bg-primary text-white rounded-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 relative top-1"
            aria-label="Profile Icon"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {user && <div className="text-black">{user.name}</div>}{" "}
        {/* Black color for the user name */}
      </Link>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav className="absolute top-full left-0 right-0 bg-white shadow-lg flex flex-col items-center gap-4 py-4 sm:hidden z-50 rounded-b-lg">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg px-4 py-2 rounded-md ${
                location.pathname === item.path
                  ? "text-white bg-primary"
                  : "text-black hover:bg-primary/10" // Darker hover effect for mobile items
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
