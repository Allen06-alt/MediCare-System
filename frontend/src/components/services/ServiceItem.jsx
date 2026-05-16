import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaStethoscope, 
  FaFlask, 
  FaHeartPulse, 
  FaTruckMedical 
} from "react-icons/fa6";

export default function ServiceItem({ title, desc, align, iconType }) {
  const navigate = useNavigate();

  const icons = {
    checkup: <FaStethoscope />,
    lab: <FaFlask />,
    heart: <FaHeartPulse />,
    emergency: <FaTruckMedical />,
  };

  const isRight = align === "right";

  // 🔥 CLICK HANDLER
  const handleClick = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login", {
        state: { from: "booking", department: title },
      });
    } else {
      navigate("/booking", {
        state: { department: title },
      });
    }
  };

  return (
    <motion.div 
      onClick={handleClick} // 🔥 FULL CARD CLICKABLE
      initial={{ opacity: 0, x: isRight ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
      className={`flex gap-6 mb-12 group cursor-pointer 
        ${isRight ? "flex-row-reverse text-right" : "flex-row text-left"}`}
    >

      {/* ICON */}
      <div className="shrink-0">
        <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center text-blue-600">
          {icons[iconType] || <FaStethoscope />}
        </div>
      </div>

      {/* TEXT */}
      <div>
        <h3 className="text-xl font-bold group-hover:text-blue-600">
          {title}
        </h3>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>

    </motion.div>
  );
}