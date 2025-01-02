import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const AdminPage = () => {
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await ApiService.getUserProfile();
        setAdminName(response.user.name);
      } catch (error) {
        console.error("Error fetching admin details:", error.message);
      }
    };

    fetchAdminName();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="flex-grow flex flex-col items-center justify-center text-center  mt-[-40vh]">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                    Welcome, {adminName}
                </h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <button 
                        className="bg-teal-500 text-white font-medium py-2 px-4 md:py-3 md:px-6 rounded-lg shadow hover:bg-teal-600 focus:outline-none transition"
                        onClick={() => navigate('/admin/manage-rooms')}
                    >
                        Manage Rooms
                    </button>
                    <button 
                        className="bg-blue-500 text-white font-medium py-2 px-4 md:py-3 md:px-6 rounded-lg shadow hover:bg-blue-600 focus:outline-none transition"
                        onClick={() => navigate('/admin/manage-bookings')}
                    >
                        Manage Bookings
                    </button>
                </div>
            </div>
    </div>
  );
};

export default AdminPage;
