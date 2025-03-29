import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";

const PlacesPage = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get("/api/user-places", {
          params: { page, limit: 10 },
        });

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch places");
        }

        // No need to transform data here - backend handles it
        setPlaces(data.places);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Failed to fetch places:", err);
        setError(
          err.message ||
            "Failed to load teacher profiles. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [page]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-2 text-gray-600">Loading teacher profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <AccountNav />

      {action !== "new" && (
        <div className="text-center mb-8">
          <Link
            to="/account/places/new"
            className="inline-flex gap-2 items-center bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-dark transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            Add New Teacher Profile
          </Link>
        </div>
      )}

      <div className="mt-4">
        {places.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600">No teacher profiles found.</p>
            <Link
              to="/account/places/new"
              className="inline-block mt-4 text-primary hover:underline"
            >
              Create your first teacher profile
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {places.map((place) => (
                <Link
                  to={`/account/places/${place._id}`}
                  className="flex flex-col sm:flex-row gap-4 cursor-pointer bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100"
                  key={place._id}
                >
                  <div className="w-full sm:w-48 h-48 flex-shrink-0">
                    <PlaceImg
                      place={place}
                      className="rounded-lg object-cover h-full w-full"
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {place.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Owner: {place.ownerInfo?.name || "Admin"} (
                      {place.ownerInfo?.email || process.env.VITE_ADMIN_EMAIL})
                    </p>
                    <p className="text-sm mt-2 text-gray-700 line-clamp-3">
                      {place.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {place.levels?.map((level, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PlacesPage;
