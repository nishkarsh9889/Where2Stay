import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const EditRoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState({
    roomPhotoUrl: "",
    roomType: "",
    roomPrice: "",
    roomDescription: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails({
          roomPhotoUrl: response.room.roomPhotoUrl,
          roomType: response.room.roomType,
          roomPrice: response.room.roomPrice,
          roomDescription: response.room.roomDescription,
        });
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };
    fetchRoomDetails();
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("roomType", roomDetails.roomType);
      formData.append("roomPrice", roomDetails.roomPrice);
      formData.append("roomDescription", roomDetails.roomDescription);

      if (file) {
        formData.append("photo", file);
      }

      const result = await ApiService.updateRoom(roomId, formData);
      if (result.statusCode === 200) {
        setSuccess("Room updated successfully.");
        setTimeout(() => {
          setSuccess("");
          navigate("/admin/manage-rooms");
        }, 3000);
      }
      setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Do you want to delete this room?")) {
      try {
        const result = await ApiService.deleteRoom(roomId);
        if (result.statusCode === 200) {
          setSuccess("Room Deleted successfully.");
          setTimeout(() => {
            setSuccess("");
            navigate("/admin/manage-rooms");
          }, 3000);
        }
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setTimeout(() => setError(""), 5000);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit Room
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <div className="space-y-6">
          <div>
            {preview ? (
              <img
                src={preview}
                alt="Room Preview"
                className="mb-4 w-full h-48 object-cover rounded-lg shadow-sm"
              />
            ) : (
              roomDetails.roomPhotoUrl && (
                <img
                  src={roomDetails.roomPhotoUrl}
                  alt="Room"
                  className="mb-4 w-full h-48 object-cover rounded-lg shadow-sm"
                />
              )
            )}
            <input
              type="file"
              name="roomPhoto"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="roomType"
              className="block text-sm font-medium text-gray-700"
            >
              Room Type
            </label>
            <input
              type="text"
              id="roomType"
              name="roomType"
              value={roomDetails.roomType}
              onChange={handleChange}
              className="mt-2 block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="roomPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Room Price
            </label>
            <input
              type="text"
              id="roomPrice"
              name="roomPrice"
              value={roomDetails.roomPrice}
              onChange={handleChange}
              className="mt-2 block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="roomDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Room Description
            </label>
            <textarea
              id="roomDescription"
              name="roomDescription"
              value={roomDetails.roomDescription}
              onChange={handleChange}
              className="mt-2 block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
            ></textarea>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleUpdate}
              className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg shadow hover:bg-teal-600 focus:outline-none transition"
            >
              Update Room
            </button>
            <button
              onClick={handleDelete}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 focus:outline-none transition"
            >
              Delete Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoomPage;
