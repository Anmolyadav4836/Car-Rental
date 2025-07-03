import React from "react"
import { useState } from "react";
import { Navbar } from "./components/Navbar"
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBooking from "./pages/MyBooking";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCar from "./pages/owner/ManageCar";
import ManageBookings from "./pages/owner/ManageBookings";
import Login from "./components/Login";
import {Toaster} from 'react-hot-toast'
import { useAppContext } from "./context/AppContext";
import Loader from "./components/Loader";


function App() {
  const {showLogin} = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith('/owner');
  return (
    <>
      <Toaster/>

      {showLogin && <Login />}
      

      {!isOwnerPath && <Navbar/>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBooking />} />

        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCar />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>

    
      <Footer />
    </>
  )
}

export default App