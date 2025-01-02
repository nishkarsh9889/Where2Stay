import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const AddRoomPage = () => {
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
  const [roomTypes, setRoomTypes] = useState([]);
  const [newRoomType, setNewRoomType] = useState(false);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error("Error fetching room types:", error.message);
      }
    };
    fetchRoomTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoomTypeChange = (e) => {
    if (e.target.value === "new") {
      setNewRoomType(true);
      setRoomDetails((prevState) => ({ ...prevState, roomType: "" }));
    } else {
      setNewRoomType(false);
      setRoomDetails((prevState) => ({
        ...prevState,
        roomType: e.target.value,
      }));
    }
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

  const addRoom = async () => {
    if (
      !roomDetails.roomType ||
      !roomDetails.roomPrice ||
      !roomDetails.roomDescription
    ) {
      setError("All room details must be provided.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    if (!window.confirm("Do you want to add this room?")) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("roomType", roomDetails.roomType);
      formData.append("roomPrice", roomDetails.roomPrice);
      formData.append("roomDescription", roomDetails.roomDescription);

      if (file) {
        formData.append("photo", file);
      }

      const result = await ApiService.addRoom(formData);
      if (result.statusCode === 200) {
        setSuccess("Room Added successfully.");

        setTimeout(() => {
          setSuccess("");
          navigate("/admin/manage-rooms");
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Add New Room
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <div className="space-y-6">
          <div>
            {preview && (
              <img
                src={preview}
                alt="Room Preview"
                className="mb-2 w-full h-32 object-cover rounded-lg"
              />
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
            <select
              id="roomType"
              value={roomDetails.roomType}
              onChange={handleRoomTypeChange}
              className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="">Select a room type</option>
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
              <option value="new">Other (please specify)</option>
            </select>
            {newRoomType && (
              <input
                type="text"
                name="roomType"
                placeholder="Enter new room type"
                value={roomDetails.roomType}
                onChange={handleChange}
                className="mt-6 block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
              />
            )}
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
              className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
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
              className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
            ></textarea>
          </div>

          <button
            onClick={addRoom}
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg shadow hover:bg-teal-600 focus:outline-none transition"
          >
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomPage;
