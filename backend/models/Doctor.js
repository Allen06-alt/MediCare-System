// models/Doctor.js

import mongoose from "mongoose";

const doctorSchema =
  new mongoose.Schema({

    // ✅ NAME
    name: {
      type: String,
      required: true,
    },

    // ✅ EMAIL
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // ✅ PASSWORD
    password: {
      type: String,
      required: true,
    },

    // ✅ ROLE
    role: {
      type: String,
      default: "doctor",
    },

    // ✅ SPECIALIZATION
    specialization: {
      type: String,
      required: true,
    },

    // ✅ IMAGE
    image: {
      type: String,
      default: "",
    },

    // ✅ EXPERIENCE
    experience: {
      type: Number,
      default: 0,
    },

  }, {

    timestamps: true,
  });

export default mongoose.model(
  "Doctor",
  doctorSchema
);