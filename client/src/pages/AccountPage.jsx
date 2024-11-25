import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx"; // Ensure you import the correct context
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
  const { user, ready, setUser } = useContext(UserContext); // Access setUser here
  const { subpage } = useParams(); // Get subpage from the route
  const [redirect, setRedirect] = useState(null);

  // Return loading state if data is not ready
  if (!ready) {
    return <div>Loading...</div>;
  }

  // Redirect to login if user is not authenticated
  if (!user && ready && !redirect) {
    return <Navigate to={"/login"} />;
  }

  // Function to conditionally add classes for active link
  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full"; // Active state for the link
    }
    return classes; // Make sure to return the generated classes
  }

  // Logout function with error handling
  async function logout() {
    await axios.post("/logout"); // Sends logout request to the backend
    setUser(null); // Clear user from context after logout
    setRedirect("/"); // Redirect to home page after logout
  }

  if (redirect) {
    return <Navigate to={redirect} />; // Use Navigate for redirect after logout
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        {/* Ensure the path matches for active subpage */}
        <Link className={linkClasses("profile")} to={"/account/profile"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Accommodations
        </Link>
      </nav>

      {/* Conditional rendering based on subpage */}
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Log out
          </button>
        </div>
      )}

      {subpage === "bookings" && (
        <div>
          <p>Bookings section content...</p>
        </div>
      )}

      {subpage === "places" && (
        <div>
          <p>Places section content...</p>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
