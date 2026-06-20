import dotenv from "dotenv";

// ✅ LOAD ENV
dotenv.config({
  path: "./.env",
});

import express from "express";

import cors from "cors";

import connectDB
from "./config/db.js";

// 🔥 ROUTES
import authRoutes
from "./routes/authRoutes.js";

import doctorRoutes
from "./routes/doctorRoutes.js";

import doctorAuthRoutes
from "./routes/doctorAuthRoutes.js";

import bookingRoutes
from "./routes/bookingRoutes.js";

import familyRoutes
from "./routes/familyRoutes.js";

import notificationRoutes
from "./routes/notificationRoutes.js";

import prescriptionRoutes
from "./routes/prescriptionRoutes.js";


import receiptRoutes
from "./routes/receiptRoutes.js";

// ✅ CONNECT DATABASE
connectDB();

const app = express();

// ✅ MIDDLEWARE
app.use(cors());

app.use(express.json());

// ✅ AUTH
app.use(
  "/api/auth",
  authRoutes
);

// ✅ DOCTOR AUTH
app.use(
  "/api/doctor-auth",
  doctorAuthRoutes
);

// ✅ DOCTORS
app.use(
  "/api/doctors",
  doctorRoutes
);

// ✅ BOOKINGS
app.use(
  "/api/bookings",
  bookingRoutes
);

// ✅ FAMILY
app.use(
  "/api/family",
  familyRoutes
);

// ✅ NOTIFICATIONS
app.use(
  "/api/notifications",
  notificationRoutes
);

// ✅ PRESCRIPTIONS
app.use(
  "/api/prescriptions",
  prescriptionRoutes
);



// ✅ RECEIPT
app.use(
  "/api/receipt",
  receiptRoutes
);

// ✅ TEST ROUTE
app.get(
  "/",
  (req, res) => {

    res.send(
      "MediCare API Running ✅"
    );
  }
);

// ✅ START SERVER
const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT} 🚀`
    );
  }
);