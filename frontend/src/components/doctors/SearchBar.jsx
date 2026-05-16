import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ search, setSearch }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-xl mx-auto mb-12 px-4"
    >
      <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none text-gray-400">
        <FaSearch size={18} />
      </div>
      <input
        type="text"
        placeholder="Search for doctors, specialities..."
        /* Border color-ai medical cyan shadow-oda mix panni irukkaen */
        className="w-full pl-16 pr-6 py-5 bg-white border border-blue-50 rounded-2xl 
                   shadow-[0_15px_35px_rgba(0,0,0,0.03)] outline-none transition-all
                   focus:border-blue-300 focus:ring-4 focus:ring-blue-100/50 focus:shadow-blue-200/20
                   text-gray-700 placeholder:text-gray-400 font-medium"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </motion.div>
  );
}