import React, { useState } from "react";
import ApiService from "../../services/ApiService";

const FindBookingPage = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!confirmationCode.trim()) {
      setError("Please Enter a booking confirmation code");
      setTimeout(() => setError(""), 5000);
      return;
    }
    try {
      const response = await ApiService.getBookingByConfirmationCode(
        confirmationCode
      );
      setBookingDetails(response.booking);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Find Booking</h2>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label
            htmlFor="confirmationCode"
            className="block text-sm font-medium text-gray-700"
          >
            Booking Confirmation Code
          </label>
          <input
            type="text"
            id="confirmationCode"
            placeholder="Enter your booking confirmation code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            onKeyDown={handleKeyDown} // Added Enter key handler
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600 transition"
        >
          Find
        </button>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>
      {bookingDetails && (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Booking Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-medium text-gray-700">
                Confirmation Code:
              </span>{" "}
              {bookingDetails.bookingConfirmationCode}
            </p>
            <p>
              <span className="font-medium text-gray-700">Check-in Date:</span>{" "}
              {bookingDetails.checkInDate}
            </p>
            <p>
              <span className="font-medium text-gray-700">Check-out Date:</span>{" "}
              {bookingDetails.checkOutDate}
            </p>
            <p>
              <span className="font-medium text-gray-700">Adults:</span>{" "}
              {bookingDetails.numOfAdults}
            </p>
            <p>
              <span className="font-medium text-gray-700">Children:</span>{" "}
              {bookingDetails.numOfChildren}
            </p>
          </div>
          <hr className="my-6" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Booker Details
          </h3>
          <div>
            <p>
              <span className="font-medium text-gray-700">Name:</span>{" "}
              {bookingDetails.user.name}
            </p>
            <p>
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {bookingDetails.user.email}
            </p>
            <p>
              <span className="font-medium text-gray-700">Phone:</span>{" "}
              {bookingDetails.user.phoneNo}
            </p>
          </div>
          <hr className="my-6" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Room Details
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p>
              <span className="font-medium text-gray-700">Room Type:</span>{" "}
              {bookingDetails.room.roomType}
            </p>
            <img
              src={bookingDetails.room.roomPhotoUrl}
              alt="Room"
              className="max-w-xs rounded-md shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FindBookingPage;
