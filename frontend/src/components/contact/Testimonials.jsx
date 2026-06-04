import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";

export default function Testimonials() {
  const data = [
    {
      name: "Cynthia Jenson",
      role: "Patient",
      text: "Great service and friendly doctors. The facility is world-class and I felt very comfortable throughout my treatment.",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Michael Garis",
      role: "Patient",
      text: "Very professional and quick treatment. The doctors take time to explain everything clearly. Highly recommended!",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  return (
    <section className="bg-[#f8fbff] py-24 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] block">
            Testimonials
          </span>

          <h2 className="text-4xl font-black text-gray-900 leading-tight">
            What Our Happy{" "}
            <span className="text-blue-600">
              Patients
            </span>{" "}
            Say About Us
          </h2>

          <p className="text-gray-500 font-medium leading-relaxed">
            We are committed to providing exceptional healthcare
            services with experienced doctors, advanced medical
            facilities, and patient-centered care. Your health
            and satisfaction are our top priorities.
          </p>

          {/* STATS */}
          <div className="flex gap-10 pt-4">
            <div>
              <h3 className="text-3xl font-black text-blue-600">
                5000+
              </h3>
              <p className="text-gray-500 text-sm">
                Patients Treated
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-blue-600">
                50+
              </h3>
              <p className="text-gray-500 text-sm">
                Specialist Doctors
              </p>
            </div>
          </div>
        </motion.div>

        {/* TESTIMONIAL CARDS */}
        {data.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.2,
              duration: 0.6,
            }}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 relative group transition-all"
          >
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-blue-100 group-hover:text-blue-600 transition-colors">
              <FaQuoteLeft size={30} />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className="text-yellow-400 text-sm"
                />
              ))}
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8 italic">
              "{t.text}"
            </p>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={t.img}
                alt={t.name}
                className="w-14 h-14 rounded-2xl object-cover shadow-md"
              />

              <div>
                <h4 className="font-black text-gray-900 leading-none mb-1">
                  {t.name}
                </h4>

                <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">
                  {t.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}