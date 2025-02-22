import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import { FaCheckCircle } from "react-icons/fa";

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
    return <p className="text-center text-gray-500">Yuklanmoqda...</p>;
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-4 px-4 pt-4 sm:mx-0 sm:px-8 sm:pt-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
        {place.title}
      </h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />

      {/* Main Content */}
      <div className="mt-6 mb-6 gap-6 grid grid-cols-1 md:grid-cols-[minmax(300px,2fr)_minmax(250px,1fr)]">
        <div className="space-y-6">
          <div className="my-4">
            <h2 className="font-semibold text-xl sm:text-2xl text-gray-800">
              Tavsif
            </h2>
            <div className="text-justify text-base sm:text-lg text-gray-700">
              {place.description.split("\n").map(
                (paragraph, index) =>
                  paragraph.trim() && (
                    <p key={index} className="mb-3 sm:mb-4">
                      {paragraph}
                    </p>
                  )
              )}
            </div>
          </div>

          {/* Booking Information */}
          <div className="p-4 sm:p-5 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="font-semibold text-lg sm:text-xl mb-3 sm:mb-4 text-gray-800">
              Bronlash Ma'lumotlari:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row justify-between">
                <span className="font-medium text-gray-700 text-sm sm:text-base">
                  Dars boshlanishi:
                </span>
                <span className="text-gray-900 text-sm sm:text-base">
                  {place.checkIn}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between">
                <span className="font-medium text-gray-700 text-sm sm:text-base">
                  Dars tugashi:
                </span>
                <span className="text-gray-900 text-sm sm:text-base">
                  {place.checkOut}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between">
                <span className="font-medium text-gray-700 text-sm sm:text-base">
                  Maksimal talabalar:
                </span>
                <span className="text-gray-900 text-sm sm:text-base">
                  {place.maxGuests}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Widget */}
        <div className="sticky top-4 h-fit">
          <BookingWidget place={place} />
        </div>
      </div>

      {/* Extra Info and Perks Section */}
      <div className="bg-white -mx-4 px-4 py-6 sm:-mx-8 sm:px-8 sm:py-8 border-t rounded-lg shadow-md">
        <div>
          <h2 className="font-semibold text-xl sm:text-2xl text-gray-800">
            Qo'shimcha Ma'lumot
          </h2>
          <p className="mb-4 mt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
            {place.extraInfo}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">O'qitish Darajalari:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {place.levels?.map((level) => (
              <span
                key={level}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {level}
              </span>
            ))}
          </div>
        </div>

        {/* Perks */}
        <div>
          <h2 className="font-semibold text-xl sm:text-2xl text-gray-800 mt-4 sm:mt-6">
            Ta'lim markazi qulayliklari:
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
            {place.perks && place.perks.length > 0 ? (
              place.perks.map((perk, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm sm:text-base hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <FaCheckCircle className="text-primary text-lg sm:text-xl shrink-0" />
                  <span className="font-medium break-words">{perk}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Mavjud hech bonusi.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
