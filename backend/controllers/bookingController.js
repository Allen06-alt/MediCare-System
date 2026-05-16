
import Booking from "../models/Booking.js";

import Notification from "../models/Notification.js";


// 🔥 CREATE BOOKING
export const createBooking = async (
  req,
  res
) => {

  try {

    console.log(
      "REQ BODY 👉",
      req.body
    );

    const {

      userEmail,

      patientName,

      age,

      phone,

      department,

      symptoms,

      date,

      slot,

      doctor,

      patientType,

      patientId,

      paymentId,

      paymentStatus,

      amount,

      status,

    } = req.body;

    // ✅ VALIDATION
    if (

      !userEmail ||

      !patientName ||

      !department ||

      !date ||

      !slot
    ) {

      return res.status(400).json({

        message:
          "Required fields missing ❌",
      });
    }

    // ✅ SLOT CHECK
    const existing =
      await Booking.findOne({

        "doctor.email":
          doctor?.email,

        date,

        slot,

        status: {
          $ne:
            "cancelled",
        },
      });

    if (existing) {

      return res.status(400).json({

        message:
          "Slot already booked ❌",
      });
    }

    // ✅ CREATE BOOKING
    const booking =
      new Booking({

        userEmail,

        patientName,

        age,

        phone,

        patientType:
          patientType ||
          "self",

        patientId:
          patientId ||
          null,

        doctor: {

          id:
            doctor?.id || "",

          name:
            doctor?.name || "",

          specialization:
            doctor?.specialization || "",

          email:
            doctor?.email || "",
        },

        department,

        symptoms,

        date,

        slot,

        // ✅ PAYMENT
        paymentId:
          paymentId || "",

        paymentStatus:
          paymentStatus || "pending",

        amount:
          amount || 0,

        // ✅ STATUS
        status:
          status || "pending",

        prescription:
          null,
      });

    await booking.save();

    // ✅ USER NOTIFICATION
    await Notification.create({

      userEmail:
        userEmail,

      title:
        "Appointment Booked",

      message:
        `${patientName} booked appointment on ${date} at ${slot}`,

      type:
        "booking",
    });

    // ✅ DOCTOR NOTIFICATION
    if (doctor?.email) {

      await Notification.create({

        userEmail:
          doctor.email,

        title:
          "New Appointment",

        message:
          `${patientName} booked an appointment`,

        type:
          "booking",
      });
    }

    res.status(201).json({

      message:
        "Booking successful ✅",

      data:
        booking,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({

      message:
        "Booking failed ❌",
    });
  }
};



// 🔥 GET BOOKED SLOTS
export const getBookedSlots =
  async (req, res) => {

    try {

      const {

        doctorEmail,

        date,

      } = req.params;

      const bookings =
        await Booking.find({

          "doctor.email":
            doctorEmail,

          date,

          status: {

            $ne:
              "cancelled",
          },
        });

      const bookedSlots =
        bookings.map(
          (b) => b.slot
        );

      res.json(
        bookedSlots
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Error fetching slots ❌",
      });
    }
  };



// 🔥 GET SINGLE BOOKING
export const getSingleBooking =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {

        return res.status(404).json({

          message:
            "Booking not found ❌",
        });
      }

      res.json(
        booking
      );

    } catch (err) {

      console.error(err);

      res.status(500).json({

        message:
          "Error fetching booking ❌",
      });
    }
  };



// 🔥 GET USER BOOKINGS
export const getUserBookings =
  async (req, res) => {

    try {

      const { email } =
        req.params;

      const bookings =
        await Booking.find({

          userEmail:
            email,

        }).sort({

          createdAt:
            -1,
        });

      res.status(200).json(
        bookings
      );

    } catch (err) {

      console.error(err);

      res.status(500).json({

        message:
          "Error fetching bookings ❌",
      });
    }
  };



// 🔥 GET DOCTOR BOOKINGS
export const getDoctorBookings =
  async (req, res) => {

    try {

      const { email } =
        req.params;

      const bookings =
        await Booking.find({

          "doctor.email":
            email,

        }).sort({

          createdAt:
            -1,
        });

      res.json(
        bookings
      );

    } catch (err) {

      console.error(err);

      res.status(500).json({

        message:
          "Error fetching doctor bookings ❌",
      });
    }
  };



// 🔥 ADMIN GET ALL BOOKINGS
export const getAllBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find()

        .sort({

          createdAt:
            -1,
        });

      res.json(
        bookings
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Error fetching bookings ❌",
      });
    }
  };



// 🔥 UPDATE BOOKING
export const updateBooking =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const updated =
        await Booking.findByIdAndUpdate(

          id,

          req.body,

          { new: true }
        );

      if (!updated) {

        return res.status(404).json({

          message:
            "Booking not found ❌",
        });
      }

      res.json({

        message:
          "Booking updated ✅",

        data:
          updated,
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({

        message:
          "Update failed ❌",
      });
    }
  };



// 🔥 CONFIRM BOOKING
export const confirmBooking =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const updated =
        await Booking.findByIdAndUpdate(

          id,

          {
            status:
              "confirmed",
          },

          { new: true }
        );

      if (!updated) {

        return res.status(404).json({

          message:
            "Booking not found ❌",
        });
      }

      await Notification.create({

        userEmail:
          updated.userEmail,

        title:
          "Appointment Confirmed",

        message:
          `Dr. ${updated.doctor?.name} confirmed your appointment`,

        type:
          "confirmed",
      });

      res.json({

        message:
          "Appointment confirmed ✅",

        data:
          updated,
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({

        message:
          "Confirmation failed ❌",
      });
    }
  };



// 🔥 CANCEL BOOKING
export const cancelBooking =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const updated =
        await Booking.findByIdAndUpdate(

          id,

          {
            status:
              "cancelled",
          },

          { new: true }
        );

      if (!updated) {

        return res.status(404).json({

          message:
            "Booking not found ❌",
        });
      }

      await Notification.create({

        userEmail:
          updated.userEmail,

        title:
          "Appointment Cancelled",

        message:
          `Your appointment on ${updated.date} was cancelled`,

        type:
          "cancelled",
      });

      res.json({

        message:
          "Appointment cancelled ✅",

        data:
          updated,
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({

        message:
          "Cancellation failed ❌",
      });
    }
  };



// 🔥 ADD PRESCRIPTION
export const addPrescription =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {

        medicines,

        notes,

        advice,

      } = req.body;

      const updated =
        await Booking.findByIdAndUpdate(

          id,

          {

            status:
              "completed",

            prescription: {

              medicines,

              notes,

              advice,
            },
          },

          { new: true }
        );

      if (!updated) {

        return res.status(404).json({

          message:
            "Booking not found ❌",
        });
      }

      await Notification.create({

        userEmail:
          updated.userEmail,

        title:
          "Prescription Added",

        message:
          `Prescription added by Dr. ${updated.doctor?.name}`,

        type:
          "prescription",
      });

      res.json({

        message:
          "Prescription added ✅",

        data:
          updated,
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({

        message:
          "Prescription failed ❌",
      });
    }
  };



// 🔥 DELETE BOOKING
export const deleteBooking =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const deleted =
        await Booking.findByIdAndDelete(
          id
        );

      if (!deleted) {

        return res.status(404).json({

          message:
            "Booking not found ❌",
        });
      }

      res.json({

        message:
          "Appointment deleted ✅",
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({

        message:
          "Delete failed ❌",
      });
    }
  };

