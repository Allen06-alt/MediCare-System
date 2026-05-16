import mongoose from "mongoose";

const familySchema =
  new mongoose.Schema({

    // 🔥 USER EMAIL
    userEmail: {
      type: String,
      required: true,
    },

    // 🔥 MEMBER NAME
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔥 AGE
    age: {
      type: Number,
      required: true,
    },

    // 🔥 RELATION
    relation: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔥 CREATED TIME
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

export default mongoose.model(
  "Family",
  familySchema
);