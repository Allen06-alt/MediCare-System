// routes/prescriptionRoutes.js

import express from "express";

import {

  createPrescription,

  getPrescriptions,

  downloadPrescription,

} from "../controllers/prescriptionController.js";

const router =
  express.Router();

// ✅ CREATE
router.post(
  "/",
  createPrescription
);

// ✅ GET ALL
router.get(
  "/",
  getPrescriptions
);

// ✅ DOWNLOAD PDF
router.get(
  "/download/:id",
  downloadPrescription
);

export default router;
