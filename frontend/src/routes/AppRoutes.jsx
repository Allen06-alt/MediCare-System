// src/routes/AppRoutes.jsx

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// 🌐 PUBLIC
import Home
from "../pages/public/Home";

import Doctors
from "../pages/public/Doctors";

import DoctorDetails
from "../pages/public/DoctorDetails";

import Services
from "../pages/public/Services";

import Contact
from "../pages/public/Contact";

// 🔐 AUTH
import Login
from "../pages/auth/Login";

import Signup
from "../pages/auth/Signup";

// 📅 BOOKING
import BookingPage
from "../pages/booking/BookingPage";

// 👤 PATIENT
import Dashboard
from "../pages/dashboard/Dashboard";

import Notifications
from "../pages/dashboard/Notifications";

// 👨‍⚕️ DOCTOR
import DoctorDashboard
from "../pages/doctor/DoctorDashboard";

import PrescriptionForm
from "../pages/doctor/PrescriptionForm";

// 👨‍💼 ADMIN
import AdminDashboard
from "../pages/admin/AdminDashboard";

// 🔒 PROTECTED
import ProtectedRoute
from "./ProtectedRoute";

export default function AppRoutes() {

  return (

    <Routes>

      {/* 🌐 PUBLIC */}
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/doctors"
        element={<Doctors />}
      />

      <Route
        path="/doctors/:id"
        element={<DoctorDetails />}
      />

      <Route
        path="/services"
        element={<Services />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      {/* 🔐 AUTH */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* 📅 BOOKING */}
      <Route
        path="/booking"
        element={
          <ProtectedRoute role="patient">

            <BookingPage />

          </ProtectedRoute>
        }
      />

      {/* 👤 PATIENT DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="patient">

            <Dashboard />

          </ProtectedRoute>
        }
      />

      {/* 🔔 NOTIFICATIONS */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute role="patient">

            <Notifications />

          </ProtectedRoute>
        }
      />

      {/* 👨‍⚕️ DOCTOR DASHBOARD */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute role="doctor">

            <DoctorDashboard />

          </ProtectedRoute>
        }
      />

      {/* 💊 PRESCRIPTION */}
      <Route
        path="/doctor/prescription/:id"
        element={
          <ProtectedRoute role="doctor">

            <PrescriptionForm />

          </ProtectedRoute>
        }
      />

      {/* 👨‍💼 ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">

            <AdminDashboard />

          </ProtectedRoute>
        }
      />

      {/* ❌ UNKNOWN ROUTE */}
      <Route
        path="*"
        element={<Navigate to="/" />}
      />

    </Routes>
  );
}