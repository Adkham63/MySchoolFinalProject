import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link, useNavigate } from "react-router-dom";
import BookingDates from "../BookingDates";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    axios.get("/api/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  // Function to cancel booking
  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
      alert("Booking successfully canceled!");
      // Navigate to the bookings page or wherever you want after canceling
      navigate("/account/bookings"); // This will take you to the bookings list
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel the booking. Please try again.");
    }
  };

  return (
    <div>
      <AccountNav />
      <div>
        {/* Display message if there are no bookings */}
        {bookings.length === 0 ? (
          <div className="text-center p-4 text-lg text-gray-600">
            <p>
              No bookings available. The teacher's profile might have been
              deleted, or no bookings exist.
            </p>
          </div>
        ) : (
          bookings.map((booking) => {
            return (
              <div
                key={booking._id}
                className="flex flex-col gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4"
              >
                {/* Wrap the entire content in a Link */}
                <Link
                  to={`/account/bookings/${booking._id}`}
                  className="flex gap-4"
                >
                  <div className="w-48">
                    <PlaceImg place={booking.place} />
                  </div>
                  <div className="py-3 pr-3 grow">
                    <h2 className="text-2xl">{booking.place.title}</h2>
                    <div className="text-xl">
                      <BookingDates
                        className="mb-2 mt-2 text-gray-500"
                        booking={booking}
                      />
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                          />
                        </svg>
                        <span className="text-2xl">
                          Total price: UZS {booking.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Cancel Booking Button placed at the bottom */}
                <div className="mt-auto flex items-center justify-center w-full">
                  {booking.place ? (
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-red-600 transition duration-300"
                    >
                      Cancel Booking
                    </button>
                  ) : (
                    <p className="text-red-500 font-semibold">
                      Cannot cancel - Teacher profile deleted
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
