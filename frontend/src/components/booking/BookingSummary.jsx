import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useBooking from "../../hooks/useBooking";
import API from "../../api/api";

export default function BookingSummary() {
  const { booking } = useBooking();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ CONFIRM BOOKING
  const handleConfirm = async () => {
    try {
      // ✅ FAKE PAYMENT ID
      const fakePaymentId = "pay_" + Date.now();

      // ✅ SAVE BOOKING
      await API.post("/api"/api/bookings", {
        userEmail: user.email,

        patientName: booking.name,

        patientType:
          booking.patientType || "self",

        patientId:
          booking.patientId || null,

        age: booking.age,

        phone: booking.phone,

        // ✅ DOCTOR
        doctor: {
          _id: booking.doctor?._id,
          id: booking.doctor?._id,
          name: booking.doctor?.name,
          specialization:
            booking.doctor?.specialization,
          email: booking.doctor?.email,
        },

        department:
          booking.department,

        symptoms:
          booking.symptoms,

        date:
          booking.date,

        slot:
          booking.slot,

        // ✅ PAYMENT
        paymentId:
          fakePaymentId,

        paymentStatus:
          "paid",

        amount:
          500,

        status:
          "confirmed",
      });

      // ✅ SUCCESS
      alert(
        "Payment Successful ✅"
      );

      // ✅ DOWNLOAD PDF RECEIPT
      const response =
        await API.get(
          `/api/receipt/${fakePaymentId}`,
          {
            responseType: "blob",
          }
        );

      const fileURL =
        window.URL.createObjectURL(
          new Blob([
            response.data,
          ])
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = fileURL;

      link.setAttribute(
        "download",
        `receipt-${fakePaymentId}.pdf`
      );

      document.body.appendChild(
        link
      );

      link.click();

      // ✅ REDIRECT
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.error(
        "Booking Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data ||
        "Booking Failed ❌"
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Booking Summary
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <p>
          <b>Patient:</b>{" "}
          {booking.name}
        </p>

        <p>
          <b>Doctor:</b>{" "}
          {booking.doctor?.name}
        </p>

        <p>
          <b>Department:</b>{" "}
          {booking.department}
        </p>

        <p>
          <b>Date:</b>{" "}
          {booking.date}
        </p>

        <p>
          <b>Slot:</b>{" "}
          {booking.slot}
        </p>

        <p>
          <b>Symptoms:</b>{" "}
          {booking.symptoms}
        </p>

        <div className="p-4 bg-blue-50 border rounded-xl">
          <h3 className="font-bold text-blue-700 text-lg">
            UPI Payment
          </h3>

          <p className="mt-2">
            UPI ID:{" "}
            <span className="font-bold">
              medicare@upi
            </span>
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Supports Google Pay,
            PhonePe, Paytm.
          </p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-2xl font-bold text-green-600">
            Consultation Fee: ₹500
          </h3>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg"
        >
          Pay & Confirm Booking
        </button>
      </div>
    </div>
  );
}