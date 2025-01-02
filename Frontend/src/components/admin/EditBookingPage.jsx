import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const EditBookingPage = () => {
  const navigate = useNavigate();
  const { bookingCode } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await ApiService.getBookingByConfirmationCode(
          bookingCode
        );
        setBookingDetails(response.booking);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBookingDetails();
  }, [bookingCode]);

  const acheiveBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to Achieve this booking?")) {
      return;
    }

    try {
      const response = await ApiService.cancelBooking(bookingId);
      if (response.statusCode === 200) {
        setSuccessMessage("The booking was Successfully Archived");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/admin/manage-bookings");
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Booking Details
        </h2>
        {bookingDetails && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Booking Details
              </h3>
              <p>
                <strong>Confirmation Code:</strong>{" "}
                {bookingDetails.bookingConfirmationCode}
              </p>
              <p>
                <strong>Check-in Date:</strong> {bookingDetails.checkInDate}
              </p>
              <p>
                <strong>Check-out Date:</strong> {bookingDetails.checkOutDate}
              </p>
              <p>
                <strong>Num Of Adults:</strong> {bookingDetails.numOfAdults}
              </p>
              <p>
                <strong>Num Of Children:</strong> {bookingDetails.numOfChildren}
              </p>
            </div>

            <hr className="border-gray-300" />

            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Booker Details
              </h3>
              <p>
                <strong>Name:</strong> {bookingDetails.user.name}
              </p>
              <p>
                <strong>Email:</strong> {bookingDetails.user.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {bookingDetails.user.phoneNo}
              </p>
            </div>

            <hr className="border-gray-300" />

            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Room Details
              </h3>
              <p>
                <strong>Room Type:</strong> {bookingDetails.room.roomType}
              </p>
              <p>
                <strong>Room Price:</strong> ${bookingDetails.room.roomPrice}
              </p>
              <p>
                <strong>Room Description:</strong>{" "}
                {bookingDetails.room.roomDescription}
              </p>
              {bookingDetails.room.roomPhotoUrl && (
                <img
                  src={bookingDetails.room.roomPhotoUrl}
                  alt="Room Preview"
                  className="rounded-lg shadow-sm mt-2"
                />
              )}
            </div>

            <button
              className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg shadow hover:bg-teal-600 focus:outline-none transition"
              onClick={() => acheiveBooking(bookingDetails.id)}
            >
              Archive Booking
            </button>
          </div>
        )}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
      </div>
    </div>
  );
};

export default EditBookingPage;
