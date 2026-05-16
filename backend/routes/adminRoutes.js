// routes/adminRoutes.js

import express from "express";

import {
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  patchAdmin,
  deleteAdmin,
  bulkInsertAdmins,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/", getAdmins);
router.get("/:id", getAdminById);

router.post("/", createAdmin);
router.post("/bulk", bulkInsertAdmins);

router.put("/:id", updateAdmin);
router.patch("/:id", patchAdmin);

router.delete("/:id", deleteAdmin);

export default router;