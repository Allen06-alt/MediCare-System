
import PDFDocument
from "pdfkit";

// ✅ DOWNLOAD RECEIPT
export const downloadReceipt =
  async (req, res) => {

    try {

      const paymentId =

        req.params.paymentId;

      // ✅ PDF
      const doc =
        new PDFDocument({

          margin: 50,
        });

      // ✅ HEADERS
      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",

        `attachment; filename=receipt-${paymentId}.pdf`
      );

      // ✅ PIPE
      doc.pipe(res);

      // ✅ TITLE
      doc
        .fontSize(26)
        .fillColor("#2563eb")
        .text(
          "MediCare Receipt",
          {
            align: "center",
          }
        );

      doc.moveDown(2);

      // ✅ CONTENT
      doc
        .fontSize(16)
        .fillColor("black")
        .text(
          `Payment ID: ${paymentId}`
        );

      doc.moveDown();

      doc.text(
        "Payment Status: SUCCESS ✅"
      );

      doc.moveDown();

      doc.text(
        "Consultation Fee: ₹500"
      );

      doc.moveDown();

      doc.text(
        `Generated On: ${new Date().toLocaleString()}`
      );

      doc.moveDown(2);

      // ✅ FOOTER
      doc
        .fontSize(14)
        .fillColor("gray")
        .text(
          "Thank you for choosing MediCare.",
          {
            align: "center",
          }
        );

      // ✅ END
      doc.end();

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Receipt generation failed ❌",
      });
    }
  };

