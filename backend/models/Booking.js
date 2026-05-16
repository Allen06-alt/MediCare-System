
import mongoose from "mongoose";

const bookingSchema =
  new mongoose.Schema({

    // ✅ USER
    userEmail: {
      type: String,
      required: true,
    },

    // ✅ PATIENT INFO
    patientName: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
    },

    phone: {
      type: String,
    },

    // ✅ PATIENT TYPE
    patientType: {
      type: String,

      enum: [
        "self",
        "family",
      ],

      default: "self",
    },

    patientId: {
      type: String,
      default: null,
    },

    // ✅ DOCTOR INFO
    doctor: {

      id: String,

      name: String,

      specialization: String,

      email: String,
    },

    // ✅ DEPARTMENT
    department: {
      type: String,
    },

    // ✅ SYMPTOMS
    symptoms: {
      type: String,
    },

    // ✅ DATE
    date: {
      type: String,
      required: true,
    },

    // ✅ SLOT
    slot: {
      type: String,
      required: true,
    },

    // ✅ PAYMENT ID
    paymentId: {
      type: String,
      default: "",
    },

    // ✅ PAYMENT STATUS
    paymentStatus: {
      type: String,

      enum: [
        "pending",
        "paid",
      ],

      default: "pending",
    },

    // ✅ PAYMENT AMOUNT
    amount: {
      type: Number,
      default: 0,
    },

    // ✅ BOOKING STATUS
    status: {
      type: String,

      enum: [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
      ],

      default: "pending",
    },

    // ✅ PRESCRIPTION
    prescription: {

      medicines: String,

      notes: String,

      advice: String,
    },

    // ✅ CREATED DATE
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

export default mongoose.model(
  "Booking",
  bookingSchema
);

