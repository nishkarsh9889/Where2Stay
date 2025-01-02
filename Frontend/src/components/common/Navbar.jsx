import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

function Navbar() {
  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const isUser = ApiService.isUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    const isLogout = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (isLogout) {
      ApiService.logout();
      navigate("/home");
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-white font-semibold text-2xl">
          <NavLink to="/home">Where-2-Stay</NavLink>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleDropdown} className="text-white mr-5 p-3">
            ☰
          </button>
        </div>
        <ul
          className={`${
            isDropdownOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 text-gray-300`}
        >
          <li>
            <NavLink
              to="/home"
              onClick={closeDropdown}
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-teal-500"
                  : "hover:text-teal-400"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rooms"
              onClick={closeDropdown}
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-teal-500"
                  : "hover:text-teal-400"
              }
            >
              Rooms
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/find-booking"
              onClick={closeDropdown}
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-teal-500"
                  : "hover:text-teal-400"
              }
            >
              Find my Booking
            </NavLink>
          </li>

          {isUser && (
            <li>
              <NavLink
                to="/profile"
                onClick={closeDropdown}
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-2 border-teal-500"
                    : "hover:text-teal-400"
                }
              >
                My Profile
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                onClick={closeDropdown}
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-2 border-teal-500"
                    : "hover:text-teal-400"
                }
              >
                Admin
              </NavLink>
            </li>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/login"
                  onClick={closeDropdown}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white border-b-2 border-teal-500"
                      : "hover:text-teal-400"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  onClick={closeDropdown}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white border-b-2 border-teal-500"
                      : "hover:text-teal-400"
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-teal-400 text-gray-300 px-2 py-1 border-b-2 border-transparent hover:border-teal-500 focus:outline-none transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
