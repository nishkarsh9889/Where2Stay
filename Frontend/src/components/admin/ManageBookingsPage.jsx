import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import Pagination from "../common/Pagination";

const ManageBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await ApiService.getAllBookings();
        const allBookings = response.bookingList;
        setBookings(allBookings);
        setFilteredBookings(allBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings(searchTerm);
  }, [searchTerm, bookings]);

  const filterBookings = (term) => {
    if (term === "") {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(
        (booking) =>
          booking.bookingConfirmationCode &&
          booking.bookingConfirmationCode
            .toLowerCase()
            .includes(term.toLowerCase())
      );
      setFilteredBookings(filtered);
    }
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-6 py-8 flex-grow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          All Bookings
        </h2>
        <div className="mb-6 flex items-center space-x-4">
          <label htmlFor="search" className="text-gray-600 font-medium">
            Filter by Booking Number:
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Enter booking number"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="booking-results grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow-md rounded-lg p-6">
              <p>
                <strong>Booking Code:</strong> {booking.bookingConfirmationCode}
              </p>
              <p>
                <strong>Check In Date:</strong> {booking.checkInDate}
              </p>
              <p>
                <strong>Check out Date:</strong> {booking.checkOutDate}
              </p>
              <p>
                <strong>Total Guests:</strong> {booking.totalNumOfGuest}
              </p>
              <button
                className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none transition"
                onClick={() =>
                  navigate(
                    `/admin/edit-booking/${booking.bookingConfirmationCode}`
                  )
                }
              >
                Manage Booking
              </button>
            </div>
          ))}
        </div>

        <Pagination
          roomsPerPage={bookingsPerPage}
          totalRooms={filteredBookings.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default ManageBookingsPage;
