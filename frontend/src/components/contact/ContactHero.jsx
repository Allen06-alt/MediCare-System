import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Testimonials() {
  const navigate = useNavigate();

  const handleBooking = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login", { state: { from: "booking" } });
    } else {
      navigate("/booking");
    }
  };

  return (
    <section className="bg-gray-50 py-20 text-center">

      <h2 className="text-3xl font-bold mb-6">
        What Our Patients Say
      </h2>

      {/* 🔥 FIXED BUTTON */}
      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Book Appointment
      </button>

    </section>
  );
}