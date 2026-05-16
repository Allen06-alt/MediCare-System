import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema({

    // 🔥 NAME
    name: {
      type: String,
      required: true,
    },

    // 🔥 EMAIL
    email: {
      type: String,

      required: true,

      unique: true,
    },

    // 🔥 PASSWORD
    password: {
      type: String,

      required: true,
    },

    // 🔥 ROLE
    role: {
      type: String,

      enum: [
        "patient",
        "doctor",
        "admin",
      ],

      default: "patient",
    },

    // 🔥 OPTIONAL PHONE
    phone: {
      type: String,
      default: "",
    },

    // 🔥 CREATED TIME
    createdAt: {
      type: Date,
      default: Date.now,
    },

  });

export default mongoose.model(
  "User",
  userSchema
);