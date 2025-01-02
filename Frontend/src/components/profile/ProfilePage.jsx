import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ApiService.getUserProfile();
        const userPlusBookings = await ApiService.getUserBookings(
          response.user.id
        );
        setUser(userPlusBookings.user);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    ApiService.logout();
    navigate("/home");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {user && (
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>
      )}
      <div className="space-y-4">
        <button
          className="bg-red-500 text-white m-5 px-4 py-2 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {user && (
        <div className="mt-8 bg-white p-6 rounded shadow-lg w-full max-w-lg">
          <h3 className="text-xl font-semibold mb-2">My Profile Details</h3>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phoneNo}
          </p>
        </div>
      )}
      <div className="mt-8 bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-2">My Booking History</h3>
        <div className="space-y-4">
          {user && user.bookings.length > 0 ? (
            user.bookings.map((booking) => (
              <div key={booking.id} className="border p-4 rounded-lg shadow-sm">
                <p>
                  <strong>Booking Code:</strong>{" "}
                  {booking.bookingConfirmationCode}
                </p>
                <p>
                  <strong>Check-in Date:</strong> {booking.checkInDate}
                </p>
                <p>
                  <strong>Check-out Date:</strong> {booking.checkOutDate}
                </p>
                <p>
                  <strong>Total Guests:</strong> {booking.totalNumOfGuest}
                </p>
                <p>
                  <strong>Room Type:</strong> {booking.room.roomType}
                </p>
                {booking.room.roomPhotoUrl && (
                  <img
                    src={booking.room.roomPhotoUrl}
                    alt="Room"
                    className="mt-2 rounded-lg w-full max-h-64 object-cover"
                  />
                )}
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
