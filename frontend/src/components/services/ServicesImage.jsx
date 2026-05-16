import { motion } from "framer-motion";

export default function ServicesImage() {
  return (
    <div className="relative flex justify-center items-center py-10">
      
      {/* 🌌 BACKGROUND GLOW - Medical Blue Theme */}
      <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
      
      {/* 🎨 DECORATIVE RING */}
      <motion.div 
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] border-2 border-dashed border-blue-100 rounded-full opacity-50"
      ></motion.div>

      {/* 👨‍⚕️ DOCTOR IMAGE WITH FLOATING ANIMATION */}
      <motion.div
        animate={{ 
          y: [0, -15, 0], // Mella mela poyittu keela varum
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative z-10"
      >
        <img
          src="https://pngimg.com/uploads/doctor/doctor_PNG16041.png"
          alt="Professional Doctor"
          className="w-64 md:w-96 object-contain drop-shadow-[0_20px_50px_rgba(37,99,235,0.2)]"
        />

        {/* 🏥 FLOATING STATS OR BADGE (Optional Design Element) */}
        <div className="absolute -bottom-4 -left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50 hidden md:block">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Experts Available</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}