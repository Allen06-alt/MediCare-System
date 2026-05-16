
import express from "express";

import {
  downloadReceipt,
} from "../controllers/receiptController.js";

const router =
  express.Router();

// ✅ RECEIPT PDF
router.get(
  "/:paymentId",
  downloadReceipt
);

export default router;
