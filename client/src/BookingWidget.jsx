import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
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
    numberOfNights = differenceInCalendarDays(checkOut, checkIn);
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
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-2xl mx-auto">
      <div className="text-center text-xl text-gray-800 font-semibold mb-4">
        Price: UZS {place.price} / per lesson
      </div>

      <div className="border border-gray-200 rounded-xl p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date:
            </label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              placeholderText="Select start date"
              className="w-full border text-xs rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date:
            </label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn}
              placeholderText="Select end date"
              className="w-full text-xs border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Students:
        </label>
        <input
          type="number"
          value={numberOfGuests}
          onChange={(ev) => setNumberOfGuests(ev.target.value)}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
        />
        {numberOfNights > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Full Name:
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            />
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Phone Number:
            </label>
            <input
              type="tel"
              placeholder="+998901112233"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      </div>

      <button
        onClick={bookThisPlace}
        className="mt-6 w-full bg-primary text-white py-3 px-4 rounded-full hover:bg-primary-dark transition-all duration-300 font-semibold"
      >
        Book Trial Lessons
        {numberOfNights > 0 && <span> UZS {numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
