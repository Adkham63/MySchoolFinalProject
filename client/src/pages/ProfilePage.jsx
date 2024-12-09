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

  // Return loading state if data is not ready
  if (!ready) {
    return <div>Loading...</div>;
  }

  // Redirect to login if the user is not authenticated
  if (!user && ready && !redirect) {
    return <Navigate to="/login" />;
  }

  // Logout function with error handling
  async function logout() {
    try {
      await axios.post("/logout");
      setUser(null);
      setRedirect("/"); // Redirect to the homepage after logging out
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred during logout. Please try again.");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {/* Conditional rendering based on subpage */}
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <h2>
            Logged in as {user.name} ({user.email})
          </h2>
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
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
