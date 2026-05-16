import { motion } from "framer-motion";
import { FaStar, FaUserCheck, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";

export default function DoctorInfo({ doctor }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-blue-50 flex flex-col md:flex-row items-center md:items-start gap-10 max-w-5xl mx-auto"
    >
      {/* 📸 DOCTOR IMAGE */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-blue-100 rounded-[2.5rem] rotate-6 -z-10"></div>

        <img
          src={doctor.image || "https://via.placeholder.com/150"} // 🔥 FIX
          alt={doctor.name}
          className="w-40 h-40 md:w-48 md:h-48 rounded-[2.5rem] object-cover border-4 border-white shadow-xl"
        />

        {/* Verified Badge */}
        <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white p-3 rounded-2xl shadow-lg border-4 border-white">
          <FaUserCheck size={20} />
        </div>
      </div>

      {/* 📝 CONTENT */}
      <div className="text-center md:text-left flex-1">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {doctor.name}
          </h1>

          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit mx-auto md:mx-0">
            <FaStar /> 4.9 (120+ Reviews)
          </span>
        </div>

        <p className="text-blue-600 font-bold text-lg mb-6 flex items-center justify-center md:justify-start gap-2 italic">
          {doctor.specialization} {/* 🔥 FIX */}
          <span className="text-gray-400 font-medium text-sm">
            • Senior Consultant
          </span>
        </p>

        {/* 🏥 INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-2xl">
            <FaGraduationCap className="text-blue-500 text-xl" />
            <span className="text-sm font-medium">
              MBBS, MD - {doctor.specialization} {/* 🔥 FIX */}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-2xl">
            <FaMapMarkerAlt className="text-rose-500 text-xl" />
            <span className="text-sm font-medium">Medical District, NY</span>
          </div>
        </div>

        {/* 📊 STATS */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-6 border-t border-gray-100">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {doctor.experience || 10}+ {/* 🔥 dynamic */}
            </p>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">
              Years Exp.
            </p>
          </div>

          <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>

          <div>
            <p className="text-2xl font-bold text-gray-900">2K+</p>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">
              Surgeries
            </p>
          </div>

          <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>

          <div>
            <p className="text-2xl font-bold text-gray-900">100%</p>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">
              Patient Satisfaction
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}