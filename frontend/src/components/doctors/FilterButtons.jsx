import { motion } from "framer-motion";

export default function FilterButtons({ filter, setFilter }) {
  const categories = ["All", "Cardiologist", "Dentist", "Neurologist", "Pediatrician", "Orthopedic", "Dermatologist"];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
      {categories.map((c) => {
        const isActive = filter === c;
        return (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className="relative px-7 py-3 text-sm font-bold transition-all duration-300 rounded-full outline-none group"
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-blue-600 rounded-full shadow-lg shadow-blue-200"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}
            <span className={`relative z-10 transition-colors ${isActive ? "text-white" : "text-gray-500 hover:text-blue-600"}`}>
              {c}
            </span>
            {!isActive && (
              <div className="absolute inset-0 border border-gray-200 rounded-full group-hover:border-blue-200 transition-colors"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}