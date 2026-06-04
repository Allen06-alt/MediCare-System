import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Testimonials() {
  const navigate = useNavigate();

  const handleBooking = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login", {
        state: { from: "booking" },
      });
    } else {
      navigate("/booking");
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose Medicare?
          </h2>

          <p className="text-gray-600 mt-3">
            Providing modern healthcare solutions
            with trusted medical professionals.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <div className="text-5xl mb-4">👨‍⚕️</div>

            <h3 className="text-xl font-bold mb-3">
              Expert Doctors
            </h3>

            <p className="text-gray-600">
              Experienced specialists providing
              quality healthcare services and
              personalized patient care.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <div className="text-5xl mb-4">📅</div>

            <h3 className="text-xl font-bold mb-3">
              Easy Appointment Booking
            </h3>

            <p className="text-gray-600">
              Schedule appointments online
              quickly and efficiently without
              waiting in long queues.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <div className="text-5xl mb-4">📋</div>

            <h3 className="text-xl font-bold mb-3">
              Digital Medical Records
            </h3>

            <p className="text-gray-600">
              Securely store and access patient
              records anytime with complete
              privacy and protection.
            </p>
          </motion.div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 text-center mb-14">

          <div>
            <h3 className="text-3xl font-bold text-blue-600">
              5000+
            </h3>

            <p className="text-gray-600">
              Patients
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-green-600">
              50+
            </h3>

            <p className="text-gray-600">
              Doctors
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-purple-600">
              24/7
            </h3>

            <p className="text-gray-600">
              Support
            </p>
          </div>

        </div>

        {/* CTA */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-blue-600 text-white rounded-3xl p-10 text-center"
        >
          <h3 className="text-3xl font-bold mb-3">
            Need Medical Assistance?
          </h3>

          <p className="mb-6 text-blue-100">
            Schedule an appointment with our
            experienced healthcare professionals.
          </p>

          <button
            onClick={handleBooking}
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Book Appointment
          </button>
        </motion.div>

      </div>
    </section>
  );
}