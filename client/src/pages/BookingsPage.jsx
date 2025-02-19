import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link, useNavigate } from "react-router-dom";
import BookingDates from "../BookingDates";

// Enhanced Modal component
const AlertModal = ({ message, onClose, type }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-white/10 max-w-md w-full mx-4 transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              type === "success" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {type === "success" ? (
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            )}
          </div>
          <h2
            className={`text-2xl font-bold mb-2 ${
              type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {type === "success" ? "Success!" : "Oops!"}
          </h2>
          <p className="text-gray-600 mb-6 px-4">{message}</p>
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      setBookings((prev) =>
        prev.filter((booking) => booking._id !== bookingId)
      );
      setAlert({ message: "Booking successfully canceled!", type: "success" });
      setTimeout(() => navigate("/account/bookings"), 2000);
    } catch (error) {
      console.error("Error canceling booking:", error);
      setAlert({
        message: "Failed to cancel booking. Please try again.",
        type: "error",
      });
    }
  };

  const closeAlert = () => setAlert(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <AccountNav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-indigo-900 mb-8 flex items-center gap-3">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          My Bookings
        </h1>

        <div className="space-y-6">
          {bookings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl shadow-xl border border-indigo-50">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No Bookings Found
                </h3>
                <p className="text-gray-500">
                  It seems you haven't made any bookings yet or the teacher's
                  profile was deleted.
                </p>
              </div>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <Link to={`/account/bookings/${booking._id}`} className="block">
                  <div className="flex flex-col sm:flex-row gap-6 p-6">
                    <div className="w-full sm:w-48 h-48 relative overflow-hidden rounded-xl">
                      <PlaceImg
                        place={booking.place}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        {booking.place?.title}
                      </h2>

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
                            className="w-8 h-8 text-indigo-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                            />
                          </svg>
                          <span className="text-2xl font-semibold">
                            Total price: UZS {booking.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="border-t border-gray-100 px-6 py-4 bg-indigo-50/50">
                  {booking.place ? (
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300 border border-red-100 hover:border-red-200 shadow-sm hover:shadow-red-100"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                      Cancel Booking
                    </button>
                  ) : (
                    <div className="text-red-500 font-semibold flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                      </svg>
                      Teacher Profile Deleted
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {alert && (
        <AlertModal
          message={alert.message}
          onClose={closeAlert}
          type={alert.type}
        />
      )}
    </div>
  );
};

export default BookingsPage;
