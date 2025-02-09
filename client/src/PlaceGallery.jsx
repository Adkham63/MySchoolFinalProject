import React, { useState } from "react";
import Image from "./Image.jsx";

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-4xl w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-semibold text-gray-800">
              Photos of {place.title}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {place?.addedPhotos?.length > 0 ? (
              place.addedPhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <Image
                    src={photo}
                    alt={place.title || "Place image"}
                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No photos available
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 rounded-3xl overflow-hidden">
        {place.addedPhotos?.slice(0, 3).map((photo, index) => (
          <div key={index} className="relative">
            <Image
              onClick={() => setShowAllPhotos(true)}
              src={photo}
              alt={place.title || "Place image"}
              className="w-full h-auto object-cover cursor-pointer transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        ))}
      </div>
      {place.addedPhotos?.length > 3 && (
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex items-center justify-center gap-2 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md text-gray-800 hover:bg-gray-100 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
              clipRule="evenodd"
            />
          </svg>
          Show more photos
        </button>
      )}
    </div>
  );
};

export default PlaceGallery;
