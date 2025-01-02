import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import HomePage from "./components/home/HomePage";
import AllRoomsPage from "./components/rooms/AllRoomsPage";
import FindBookingPage from "./components/rooms/FindBookingPage";
import RoomDetailsPage from "./components/rooms/RoomDetailsPage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ProfilePage from "./components/profile/ProfilePage";
import { ProtectedRoute, AdminRoute } from "./services/Guard";
import AdminPage from "./components/admin/AdminPage";
import ManageRoomPage from "./components/admin/ManageRoomPage";
import ManageBookingsPage from "./components/admin/ManageBookingsPage";
import AddRoomPage from "./components/admin/AddRoomPage";
import EditRoomPage from "./components/admin/EditRoomPage";
import EditBookingPage from "./components/admin/EditBookingPage";
import PaymentSuccess from "./components/payment/PaymentSuccess";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {/* {Public Routes} */}
            <Route exact path="/home" element={<HomePage />}></Route>
            <Route exact path="/rooms" element={<AllRoomsPage />}></Route>
            <Route
              exact
              path="/find-booking"
              element={<FindBookingPage />}
            ></Route>
            <Route exact path="/login" element={<LoginPage />}></Route>
            <Route exact path="/register" element={<RegisterPage />}></Route>
            <Route
              exact
              path="/payment/success/"
              element={<PaymentSuccess />}
            ></Route>

            {/* {Authenticated Users Routes} */}
            <Route
              exact
              path="/room-details-book/:roomId"
              element={<ProtectedRoute element={<RoomDetailsPage />} />}
            ></Route>
            <Route
              exact
              path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} />}
            ></Route>

            {/* {Admin Routes} */}
            <Route
              exact
              path="/admin"
              element={<AdminRoute element={<AdminPage />} />}
            ></Route>
            <Route
              exact
              path="/admin/manage-rooms"
              element={<AdminRoute element={<ManageRoomPage />} />}
            ></Route>
            <Route
              exact
              path="/admin/manage-bookings"
              element={<AdminRoute element={<ManageBookingsPage />} />}
            ></Route>
            <Route
              exact
              path="/admin/add-room"
              element={<AdminRoute element={<AddRoomPage />} />}
            ></Route>
            <Route
              exact
              path="/admin/edit-room/:roomId"
              element={<AdminRoute element={<EditRoomPage />} />}
            ></Route>
            <Route
              exact
              path="/admin/edit-booking/:bookingCode"
              element={<AdminRoute element={<EditBookingPage />} />}
            ></Route>

            <Route path="*" element={<Navigate to={"/home"} />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
