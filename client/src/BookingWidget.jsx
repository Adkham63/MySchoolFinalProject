import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

const BookingWidget = ({ place, isGalleryOpen }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    try {
      const response = await axios.post("/api/booking", {
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error booking this place:", error.response?.data || error);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 w-full max-w-[90vw] sm:max-w-2xl mx-auto">
      <div className="text-center text-xl sm:text-2xl lg:text-3xl text-gray-800 font-semibold mb-3 sm:mb-4">
        Narxi: UZS {place.price} / dars uchun
      </div>

      {!isGalleryOpen && (
        <div className="border rounded-xl sm:rounded-2xl mt-3 sm:mt-4 p-2 sm:p-4 shadow-md w-full">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="py-1 sm:py-2 flex-1">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Boshlanish:
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                className="w-full text-xs sm:text-sm border rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-primary mb-2 shadow-sm"
              />
            </div>
            <div className="py-1 sm:py-2 flex-1">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Tugash:
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                className="w-full text-xs sm:text-sm border rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-primary mb-2 shadow-sm"
              />
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
          Talabalar soni:
        </label>
        <input
          type="number"
          min="1"
          max={place.maxGuests}
          value={numberOfGuests}
          onChange={(ev) =>
            setNumberOfGuests(Math.min(ev.target.value, place.maxGuests))
          }
          className="w-full text-xs sm:text-sm border rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-primary mb-3 sm:mb-4 shadow-sm"
        />

        {numberOfNights > 0 && (
          <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              To'liq Ismingiz:
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="w-full text-xs sm:text-sm border rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-primary mb-3 sm:mb-4 shadow-sm"
            />
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Telefon Raqamingiz:
            </label>
            <input
              type="tel"
              placeholder="+998901112233"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              className="w-full text-xs sm:text-sm border rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-primary mb-3 sm:mb-4 shadow-sm"
            />
          </div>
        )}
      </div>

      <button
        onClick={bookThisPlace}
        className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-primary to-primary-dark text-white py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:from-primary-dark hover:to-primary transition-all duration-300 font-semibold text-sm sm:text-base shadow-md sm:shadow-lg"
      >
        Sinov kurslariga yoziling
        {numberOfNights > 0 && (
          <span className="whitespace-nowrap">
            {" "}
            so'm {numberOfNights * place.price}
          </span>
        )}
      </button>
    </div>
  );
};
export default BookingWidget;
