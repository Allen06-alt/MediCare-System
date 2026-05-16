// controllers/prescriptionController.js

import PDFDocument from "pdfkit";

import Prescription
from "../models/Prescription.js";

// ✅ CREATE PRESCRIPTION
export const createPrescription =
  async (req, res) => {

    try {

      console.log(req.body);

      const prescription =
        new Prescription({

          bookingId:
            req.body.bookingId,

          patientName:
            req.body.patientName,

          patientEmail:
            req.body.patientEmail,

          doctorName:
            req.body.doctorName,

          disease:
            req.body.disease,

          medicines:
            req.body.medicines,

          notes:
            req.body.notes,

          advice:
            req.body.advice,
        });

      // ✅ SAVE
      await prescription.save();

      res.status(201).json({

        success: true,

        message:
          "Prescription saved ✅",

        data: prescription,
      });

    } catch (err) {

      console.log(
        "PRESCRIPTION ERROR =>",
        err
      );

      res.status(500).json({

        success: false,

        message:
          "Prescription error ❌",
      });
    }
  };

// ✅ GET ALL
export const getPrescriptions =
  async (req, res) => {

    try {

      const prescriptions =
        await Prescription.find();

      res.json(
        prescriptions
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Error fetching prescriptions ❌",
      });
    }
  };

// ✅ DOWNLOAD PDF
export const downloadPrescription =
  async (req, res) => {

    try {

      const prescription =
        await Prescription.findById(
          req.params.id
        );

      if (!prescription) {

        return res.status(404).json({

          message:
            "Prescription not found ❌",
        });
      }

      // ✅ PDF CREATE
      const doc =
        new PDFDocument();

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=prescription.pdf"
      );

      doc.pipe(res);

      // ✅ TITLE
      doc
        .fontSize(22)
        .text(
          "MediCare Prescription",
          {
            align: "center",
          }
        );

      doc.moveDown();

      // ✅ CONTENT
      doc
        .fontSize(14)
        .text(
          `Patient Name: ${prescription.patientName}`
        );

      doc.text(
        `Doctor Name: ${prescription.doctorName}`
      );

      doc.text(
        `Disease: ${prescription.disease}`
      );

      doc.text(
        `Medicines: ${prescription.medicines}`
      );

      doc.text(
        `Notes: ${prescription.notes}`
      );

      doc.text(
        `Advice: ${prescription.advice}`
      );

      doc.moveDown();

      doc.text(
        `Date: ${new Date().toLocaleDateString()}`
      );

      // ✅ END
      doc.end();

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Download failed ❌",
      });
    }
  };