import express from "express";
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  patchDoctor,
  deleteDoctor,
  bulkInsertDoctors, // 🔥 ADD THIS
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/", getDoctors);
router.get("/:id", getDoctorById);

router.post("/", createDoctor);
router.post("/bulk", bulkInsertDoctors); // ✅ BULK

router.put("/:id", updateDoctor);
router.patch("/:id", patchDoctor);
router.delete("/:id", deleteDoctor);

export default router;