import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RoomDetailsPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roomId]);

  const handleGoBack = () => {
    navigate("/rooms");
  };

  const handleConfirmBooking = () => {
    if (!checkInDate || !checkOutDate) {
      setErrorMessage("Please select check-in and check-out dates.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    const totalDays =
      Math.round(
        Math.abs(
          (new Date(checkOutDate) - new Date(checkInDate)) /
            (24 * 60 * 60 * 1000)
        )
      ) + 1;
    const totalGuests = numAdults + numChildren;
    const totalPrice = roomDetails.roomPrice * totalDays;

    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    try {
      const startDate = new Date(checkInDate).toISOString().split("T")[0];
      const endDate = new Date(checkOutDate).toISOString().split("T")[0];

      const booking = {
        checkInDate: startDate,
        checkOutDate: endDate,
        numOfAdults: numAdults,
        numOfChildren: numChildren,
      };

      const stripeSession = await ApiService.createStripeSession(booking);
      if (stripeSession) {
        window.location.href = stripeSession.payment_url;

        const response = await ApiService.bookRoom(roomId, userId, booking);
        if (response.statusCode === 200) {
          setConfirmationCode(response.bookingConfirmationCode);
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading room details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!roomDetails) {
    return <p className="text-center text-gray-600">Room not found.</p>;
  }

  const { roomType, roomPrice, roomPhotoUrl, description, bookings } =
    roomDetails;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold text-center mb-6">Room Details</h2>

      <div className="flex flex-col items-center space-y-4">
        <img
          src={roomPhotoUrl}
          alt={roomType}
          className="mx-auto rounded-lg mb-6 max-w-md w-full"
        />
        <h3 className="text-2xl font-semibold">{roomType}</h3>
        <p className="text-lg text-gray-700">Price: ${roomPrice} / night</p>
        <p className="text-gray-600">{description}</p>
      </div>

      {bookings && bookings.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">
            Existing Booking Details
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {bookings.map((booking, index) => (
              <li key={booking.id}>
                <span className="font-medium">Booking {index + 1}: </span>
                <span>
                  Check-in: {booking.checkInDate}, Out: {booking.checkOutDate}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-md">
          {showDatePicker && (
            <div className="space-y-4">
              <DatePicker
                className="block w-full mb-2 p-2 border rounded"
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                selectsStart
                startDate={checkInDate}
                endDate={checkOutDate}
                placeholderText="Check-in Date"
                dateFormat="dd/MM/yyyy"
              />
              <DatePicker
                className="block w-full mb-2 ml-5 p-2 border rounded"
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                selectsEnd
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={checkInDate}
                placeholderText="Check-out Date"
                dateFormat="dd/MM/yyyy"
              />
              <div className="flex justify-between items-center space-x-4">
                <div>
                  <label className="block mb-1 font-medium">Adults:</label>
                  <input
                    type="number"
                    min="1"
                    value={numAdults}
                    onChange={(e) => setNumAdults(parseInt(e.target.value))}
                    className="block w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Children:</label>
                  <input
                    type="number"
                    min="0"
                    value={numChildren}
                    onChange={(e) => setNumChildren(parseInt(e.target.value))}
                    className="block w-full p-2 border rounded"
                  />
                </div>
              </div>
              <button
                className="btn btn-primary w-full mt-4"
                onClick={handleConfirmBooking}
              >
                Calculate Price
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="btn btn-primary"
            onClick={() => setShowDatePicker(true)}
          >
            Book Now
          </button>
          <button className="btn btn-secondary" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>

      {totalPrice > 0 && (
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <p>
            Total Price: <span className="font-bold">${totalPrice}</span>
          </p>
          <p>Total Guests: {totalGuests}</p>
          <button onClick={acceptBooking} className="btn btn-success mt-2">
            Confirm Booking
          </button>
        </div>
      )}

      {showMessage && (
        <p className="text-center text-green-500">
          Booking successful! Confirmation code: {confirmationCode}.
        </p>
      )}
      {errorMessage && (
        <p className="text-center text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default RoomDetailsPage;
