import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";

const PlacesPage = () => {
  const { action } = useParams(); // Get 'action' param from the URL
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user-places")
      .then(({ data }) => {
        setPlaces(data);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
      });
  }, []);

  return (
    <>
      <AccountNav />
      {action !== "new" && (
        <div className="text-center">
          <Link
            to="/account/places/new"
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            Add New Place
          </Link>
        </div>
      )}
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link
                to={`/account/places/${place._id}`}
                className="flex gap-4 cursor-pointer bg-gray-200 p-4 rounded-2xl mb-4 items-start"
                key={place._id}
              >
                <div className="h-32 w-32 flex-shrink-0">
                  <PlaceImg place={place} />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold truncate">
                    {place.title}
                  </h2>
                  <p
                    className="text-sm mt-2 text-gray-700 line-clamp-3 overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: "3",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {place.description}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default PlacesPage;
