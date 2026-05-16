import { motion } from "framer-motion";

export default function ServicesHeader() {
  return (
    <div className="text-center mb-20 px-6">
      {/* 🏥 SMALL TAG */}
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-3 block"
      >
        What We Offer
      </motion.span>

      {/* 💎 MAIN TITLE */}
      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight"
      >
        Our Specialized <span className="text-blue-600">Services</span>
      </motion.h2>

      {/* 🎨 ANIMATED DIVIDER */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-1.5 bg-blue-600 rounded-full"
        ></motion.div>
        <div className="w-2 h-2 bg-blue-400 rounded-full opacity-50"></div>
      </div>

      {/* 📝 DESCRIPTION */}
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium"
      >
        Providing world-class medical care with advanced technology and a team of 
        highly experienced specialists dedicated to your health and well-being.
      </motion.p>
    </div>
  );
}