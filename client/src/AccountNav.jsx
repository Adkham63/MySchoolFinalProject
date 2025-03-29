import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

const AccountNav = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  // Extract subpage from the pathname
  let subpage = location.pathname.split("/")[2];
  if (subpage === undefined) {
    subpage = "profile"; // Default to "profile"
  }

  // Function to conditionally add classes for active link
  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white"; // Active state
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  }

  return (
    <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
      <Link className={linkClasses("profile")} to={"/account"}>
        {/* Profile Icon and Label */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        My Profile
      </Link>

      <Link className={linkClasses("bookings")} to={"/account/bookings"}>
        {/* Bookings Icon and Label */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 111-.75.375.375 0 01-1 .75ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 111-.75.375.375 0 01-1 .75Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 111-.75.375.375 0 01-1 .75Z"
          />
        </svg>
        My bookings
      </Link>

      {/* Render the admin-only link */}
      {user && user.role === "admin" && (
        <Link className={linkClasses("places")} to={"/account/places"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 111-6.75 3.375 3.375 0 016.75 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0112 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
          Teachers
        </Link>
      )}
    </nav>
  );
};

export default AccountNav;
