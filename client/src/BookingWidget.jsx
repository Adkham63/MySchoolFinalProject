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
    <div className="bg-white shadow-xl rounded-3xl p-8 max-w-2xl mx-auto">
      <div className="text-center text-2xl text-gray-800 font-semibold mb-4">
        Price: UZS {place.price} / per lesson
      </div>

      {!isGalleryOpen && (
        <div className="border rounded-2xl mt-4 p-4 shadow-md">
          <div className="flex space-x-4">
            <div className="py-3 flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start date:
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary mb-3 shadow-sm"
              />
            </div>
            <div className="py-3 flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End date:
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary mb-3 shadow-sm"
              />
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 pt-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Students:
        </label>
        <input
          type="number"
          value={numberOfGuests}
          onChange={(ev) => setNumberOfGuests(ev.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary mb-4 shadow-sm"
        />

        {numberOfNights > 0 && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Full Name:
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary mb-4 shadow-sm"
            />
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Phone Number:
            </label>
            <input
              type="tel"
              placeholder="+998901112233"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary mb-4 shadow-sm"
            />
          </div>
        )}
      </div>

      <button
        onClick={bookThisPlace}
        className="mt-6 w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 px-6 rounded-full hover:from-primary-dark hover:to-primary transition-all duration-300 font-semibold shadow-lg"
      >
        Book Trial Lessons
        {numberOfNights > 0 && <span> UZS {numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
