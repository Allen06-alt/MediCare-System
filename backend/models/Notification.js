import mongoose from "mongoose";

const notificationSchema =
  new mongoose.Schema({

    // 🔥 WHO RECEIVES
    userEmail: {
      type: String,
      required: true,
    },

    // 🔥 TITLE
    title: {
      type: String,
      required: true,
    },

    // 🔥 MESSAGE
    message: {
      type: String,
      required: true,
    },

    // 🔥 READ STATUS
    read: {
      type: Boolean,
      default: false,
    },

    // 🔥 OPTIONAL TYPE
    type: {
      type: String,
      default: "general",
    },

    // 🔥 TIME
    createdAt: {
      type: Date,
      default: Date.now,
    },

  });

export default mongoose.model(
  "Notification",
  notificationSchema
);