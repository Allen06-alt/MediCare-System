// routes/doctorAuthRoutes.js

import express from "express";

import {
  doctorLogin,
} from "../controllers/doctorAuthController.js";

const router =
  express.Router();

// ✅ LOGIN
router.post(
  "/login",
  doctorLogin
);

export default router;