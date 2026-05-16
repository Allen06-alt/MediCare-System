import { motion } from "framer-motion";
import { FaUserMd, FaUsers, FaHospital, FaHeadset } from "react-icons/fa";

export default function Stats() {
  const stats = [
    { icon: <FaUserMd />, count: "100+", label: "Expert Doctors", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: <FaUsers />, count: "5000+", label: "Happy Patients", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: <FaHospital />, count: "50+", label: "Hospitals", color: "text-teal-600", bg: "bg-teal-50" },
    { icon: <FaHeadset />, count: "24/7", label: "Care Support", color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    /* bg-[#f8fafc] use panniyullaen for clinical look */
    <div className="bg-[#f8fafc] py-12 rounded-[3rem] mb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group bg-white p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-white hover:border-blue-100 hover:shadow-2xl transition-all duration-300 text-center"
          >
            <div className={`w-16 h-16 mx-auto flex items-center justify-center rounded-2xl ${stat.bg} ${stat.color} text-2xl mb-6 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{stat.count}</h2>
            <p className="text-gray-500 font-semibold text-xs uppercase tracking-wider">{stat.label}</p>
            <div className="mt-4 h-1 w-12 bg-gray-100 mx-auto rounded-full group-hover:w-20 group-hover:bg-blue-400 transition-all"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}