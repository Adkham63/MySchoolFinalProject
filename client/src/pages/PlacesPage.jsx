import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams(); // Get 'action' param from the URL
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/api/places")
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
            // Log the photos for debugging
            console.log(place.addedPhotos); // To inspect what you are receiving

            return (
              <Link
                to={`/account/places/${place._id}`}
                className="flex gap-4 cursor-pointer bg-gray-200 p-4 rounded-2xl"
                key={place._id}
              >
                <div className="flex w-32 h-32 bg-gray-100 grow shrink-0">
                  {place.addedPhotos &&
                    Array.isArray(place.addedPhotos) &&
                    place.addedPhotos.length > 0 && (
                      <img
                        key={place._id}
                        src={`http://localhost:4000${place.addedPhotos[0]}`} // Display only the first image
                        alt={place.title}
                        className="object-cover w-full h-full"
                      />
                    )}
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default PlacesPage;
