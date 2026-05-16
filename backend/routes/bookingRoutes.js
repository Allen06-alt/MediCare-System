import express from "express";

import {

  createBooking,

  getBookedSlots,

  getUserBookings,

  getDoctorBookings,

  getSingleBooking,

  getAllBookings,

  updateBooking,

  deleteBooking,

  addPrescription,

  confirmBooking,

  cancelBooking,

} from "../controllers/bookingController.js";

const router =
  express.Router();


// 🔥 CREATE BOOKING
router.post(
  "/",
  createBooking
);


// 🔥 GET ALL BOOKINGS
// ✅ IMPORTANT
router.get(
  "/",
  getAllBookings
);


// 🔥 ADMIN ALL BOOKINGS
router.get(
  "/admin/all",
  getAllBookings
);


// 🔥 GET BOOKED SLOTS
router.get(
  "/slots/:doctorEmail/:date",
  getBookedSlots
);


// 🔥 GET SINGLE BOOKING
router.get(
  "/single/:id",
  getSingleBooking
);


// 🔥 GET DOCTOR BOOKINGS
router.get(
  "/doctor/:email",
  getDoctorBookings
);


// 🔥 CONFIRM BOOKING
router.put(
  "/:id/confirm",
  confirmBooking
);


// 🔥 CANCEL BOOKING
router.put(
  "/:id/cancel",
  cancelBooking
);


// 🔥 UPDATE BOOKING
router.put(
  "/:id",
  updateBooking
);


// 🔥 ADD PRESCRIPTION
router.put(
  "/:id/prescription",
  addPrescription
);


// 🔥 DELETE BOOKING
router.delete(
  "/:id",
  deleteBooking
);


// 🔥 GET USER BOOKINGS
// ✅ KEEP THIS LAST
router.get(
  "/:email",
  getUserBookings
);

export default router;