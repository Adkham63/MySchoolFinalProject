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
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-lg text-gray-600">
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
      console.error("Logout failed:", error);
      alert("An error occurred during logout. Please try again.");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="p-8 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
      <AccountNav />

      {/* Profile Section */}
      {subpage === "profile" && (
        <div className="max-w-lg mx-auto mt-12 bg-white shadow-xl rounded-2xl p-8 text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome, <span className="text-primary">{user.name}</span>!
          </h2>
          <p className="text-gray-500 italic mb-6">{user.email}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white py-3 px-8 rounded-full hover:bg-red-600 transition duration-300 shadow-md hover:shadow-lg"
          >
            Log out
          </button>
        </div>
      )}

      {/* Bookings Section */}
      {subpage === "bookings" && (
        <div className="max-w-4xl mx-auto mt-12 bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Your Bookings
          </h2>
          <p className="text-gray-600 text-lg">
            You have no bookings yet. Start exploring and book your first
            lesson!
          </p>
        </div>
      )}

      {/* Places Section */}
      {subpage === "places" && (
        <div className="max-w-4xl mx-auto mt-12 bg-white shadow-lg rounded-2xl p-8">
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
