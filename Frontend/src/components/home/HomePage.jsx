import React, { useState } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

const HomePage = () => {
  const [roomSearchResults, setRoomSearchResults] = useState([]);

  // Function to handle search results
  const handleSearchResult = (results) => {
    setRoomSearchResults(results);
  };

  return (
    <div className="home">
      {/* HEADER / BANNER ROOM SECTION */}
      <section>
        <header className="relative">
          <img
            src="./assets/images/hotel.webp"
            alt="Phegon Hotel"
            className="w-full h-[60vh] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold text-white">
              Welcome to <span className="text-yellow-400">Where 2 Stay</span>
            </h1>
            <h3 className="text-lg mt-4 text-white">
              Step into a heaven of comfort and care
            </h3>
          </div>
        </header>
      </section>

      {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
      <div className="my-8 px-4">
        <RoomSearch handleSearchResult={handleSearchResult} />
      </div>
      <div className="my-8 px-4">
        <RoomResult roomSearchResults={roomSearchResults} />
      </div>

      <h2 className="text-2xl font-bold text-center my-8">
        Services at <span className="text-yellow-400">Where 2 Stay</span>
      </h2>

      {/* SERVICES SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <img
            src="./assets/images/ac.png"
            alt="Air Conditioning"
            className="mx-auto w-20 h-20"
          />
          <h3 className="text-lg font-semibold mt-4">Air Conditioning</h3>
          <p className="text-gray-600 mt-2">
            Stay cool and comfortable throughout your stay with our individually
            controlled in-room air conditioning.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <img
            src="./assets/images/mini-bar.png"
            alt="Mini Bar"
            className="mx-auto w-20 h-20"
          />
          <h3 className="text-lg font-semibold mt-4">Mini Bar</h3>
          <p className="text-gray-600 mt-2">
            Enjoy a convenient selection of beverages and snacks stocked in your
            room's mini bar with no additional cost.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <img
            src="./assets/images/parking.png"
            alt="Parking"
            className="mx-auto w-20 h-20"
          />
          <h3 className="text-lg font-semibold mt-4">Parking</h3>
          <p className="text-gray-600 mt-2">
            We offer on-site parking for your convenience. Please inquire about
            valet parking options if available.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <img
            src="./assets/images/wifi.png"
            alt="WiFi"
            className="mx-auto w-20 h-20"
          />
          <h3 className="text-lg font-semibold mt-4">WiFi</h3>
          <p className="text-gray-600 mt-2">
            Stay connected throughout your stay with complimentary high-speed
            Wi-Fi access available in all guest rooms and public areas.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
