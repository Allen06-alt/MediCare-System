import mongoose from "mongoose";

const prescriptionSchema =
  new mongoose.Schema({

    bookingId: {
      type: String,
    },

    patientName: {
      type: String,
      required: true,
    },

    // ✅ ADD THIS
    patientEmail: {
      type: String,
      required: true,
    },

    doctorName: {
      type: String,
      required: true,
    },

    disease: {
      type: String,
      required: true,
    },

    medicines: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
    },

    advice: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

export default mongoose.model(
  "Prescription",
  prescriptionSchema
);