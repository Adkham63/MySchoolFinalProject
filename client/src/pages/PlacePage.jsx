import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import { FaCheckCircle } from "react-icons/fa"; // Import check icon for perks

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-4xl font-bold text-gray-800">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />

      {/* Main Content */}
      <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl text-gray-800">
              Description
            </h2>
            <div className="text-justify text-gray-700">
              {place.description.split("\n").map(
                (paragraph, index) =>
                  paragraph.trim() && (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  )
              )}
            </div>
          </div>

          {/* Booking Information */}
          <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="font-semibold text-xl mb-4 text-gray-800">
              Booking Information:
            </h2>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  Lesson start time:
                </span>
                <span className="text-gray-900">{place.checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  Lesson end time:
                </span>
                <span className="text-gray-900">{place.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  Maximum students:
                </span>
                <span className="text-gray-900">{place.maxGuests}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Widget */}
        <div>
          <BookingWidget place={place} />
        </div>
      </div>

      {/* Extra Info and Perks Section */}
      <div className="bg-white -mx-8 px-8 py-8 border-t rounded-lg shadow-md">
        <div>
          <h2 className="font-semibold text-2xl text-gray-800">Extra Info</h2>
          <p className="mb-4 mt-2 text-sm text-gray-700 leading-6">
            {place.extraInfo}
          </p>
        </div>

        {/* Perks */}
        <div>
          <h2 className="font-semibold text-2xl text-gray-800 mt-6">
            The amenities provided by the educational centre:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {place.perks && place.perks.length > 0 ? (
              place.perks.map((perk, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <FaCheckCircle className="text-primary text-xl" />
                  <span className="font-medium">{perk}</span>
                </div>
              ))
            ) : (
              <p>No perks available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
