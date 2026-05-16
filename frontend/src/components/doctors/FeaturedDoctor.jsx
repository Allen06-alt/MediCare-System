import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

export default function FeaturedDoctor() {
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/doctors")
      .then((res) => setDoctor(res.data[0]))
      .catch((err) => console.log(err));
  }, []);

  const handleBook = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login", {
        state: { from: "booking", doctor },
      });
    } else {
      navigate("/booking", {
        state: { doctor },
      });
    }
  };

  if (!doctor) return null;

  return (
    <motion.div className="bg-blue-700 p-10 rounded-3xl text-white mb-16 flex flex-col md:flex-row items-center gap-10">

      <img
        src={doctor.image}
        className="w-32 h-32 rounded-full object-cover"
      />

      <div className="flex-1">
        <h2 className="text-3xl font-bold">{doctor.name}</h2>
        <p>{doctor.specialization}</p>
      </div>

      <button
        onClick={handleBook}
        className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold"
      >
        Book Appointment
      </button>

    </motion.div>
  );
}