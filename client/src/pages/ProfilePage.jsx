import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";

const ProfilePage = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const { subpage } = useParams();
  const [redirect, setRedirect] = useState(null);

  // Show loading state if data isn't ready
  if (!ready) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-200">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if user isn't authenticated
  if (!user && ready && !redirect) {
    return <Navigate to="/login" />;
  }

  // Logout function with error handling
  async function logout() {
    try {
      await axios.post("/logout");
      setUser(null);
      setRedirect("/"); // Redirect to homepage after logout
    } catch (error) {
      console.error("Failed exit:", error);
      alert("There was an error during the exit. Please try again.");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="p-10 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
      <AccountNav />

      {/* Profile Section */}
      {subpage === "profile" && (
        <div className="max-w-lg mx-auto mt-12 bg-white shadow-xl rounded-3xl p-10 text-center transform hover:scale-105 transition duration-300">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            Welcome, <span className="text-primary">{user.name}</span>!
          </h2>
          <p className="text-gray-600 mb-6">{user.email}</p>
          <button
            onClick={logout}
            className="bg-red-600 text-white py-3 px-10 rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Log out
          </button>
        </div>
      )}

      {/* Bookings Section */}
      {subpage === "bookings" && (
        <div className="max-w-4xl mx-auto mt-12 bg-white shadow-lg rounded-3xl p-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            My bookings
          </h2>
          <p className="text-gray-600 text-lg">
            You don't have an order yet. Start exploring and make the first book
            lesson!
          </p>
        </div>
      )}

      {/* Places Section */}
      {subpage === "places" && (
        <div className="max-w-4xl mx-auto mt-12 bg-white shadow-lg rounded-3xl p-10">
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
