import express from "express";

import {
  createNotification,
  getNotifications,
  markAsRead,
  clearNotifications,
} from "../controllers/notificationController.js";

const router =
  express.Router();


// ✅ CREATE NOTIFICATION
router.post(
  "/",
  createNotification
);


// 🔥 GET USER NOTIFICATIONS
router.get(
  "/:email",
  getNotifications
);


// 🔥 MARK AS READ
router.put(
  "/read/:id",
  markAsRead
);


// 🔥 CLEAR ALL
router.delete(
  "/:email",
  clearNotifications
);

export default router;