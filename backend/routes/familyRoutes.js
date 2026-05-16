import express from "express";

import {
  addFamily,
  getFamily,
  deleteFamily,
} from "../controllers/familyController.js";

const router = express.Router();

// ✅ ADD
router.post("/", addFamily);

// ✅ GET
router.get("/:email", getFamily);

// ✅ DELETE
router.delete("/:id", deleteFamily);

export default router;