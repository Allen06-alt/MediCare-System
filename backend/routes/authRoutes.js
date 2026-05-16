import express from "express";

import {
  registerUser,
  loginUser,
  bulkRegisterUsers,

  // 🔥 ADMIN
  createAdmin,

} from "../controllers/authController.js";

const router =
  express.Router();


// 🔥 SINGLE REGISTER
router.post(
  "/register",
  registerUser
);


// 🔥 BULK REGISTER
router.post(
  "/bulk",
  bulkRegisterUsers
);


// 🔥 CREATE ADMIN
router.post(
  "/create-admin",
  createAdmin
);


// 🔥 LOGIN
router.post(
  "/login",
  loginUser
);

export default router;