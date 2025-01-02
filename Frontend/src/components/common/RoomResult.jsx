import React from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const RoomResult = ({ roomSearchResults }) => {
  const navigate = useNavigate();
  const isAdmin = ApiService.isAdmin();

  return (
    <section className="max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg">
      {roomSearchResults && roomSearchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomSearchResults.map((room) => (
            <div
              key={room.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={room.roomPhotoUrl}
                alt={room.roomType}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {room.roomType}
                </h3>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Price:</span> ${room.roomPrice}{" "}
                  / night
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Description:</span>{" "}
                  {room.roomDescription}
                </p>
              </div>
              <div className="flex justify-center p-4 bg-gray-50">
                {isAdmin ? (
                  <button
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                  >
                    Edit Room
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={() => navigate(`/room-details-book/${room.id}`)}
                  >
                    View/ Book Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </section>
  );
};

export default RoomResult;
