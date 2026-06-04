import {
  FaHeartbeat,
  FaTooth,
  FaBrain,
  FaBaby,
  FaBone,
  FaUserMd,
} from "react-icons/fa";

export default function Services() {
  const specialities = [
    {
      icon: <FaHeartbeat size={40} className="text-blue-600" />,
      title: "Cardiologist",
    },
    {
      icon: <FaTooth size={40} className="text-teal-600" />,
      title: "Dentist",
    },
    {
      icon: <FaBrain size={40} className="text-purple-600" />,
      title: "Neurologist",
    },
    {
      icon: <FaBaby size={40} className="text-orange-500" />,
      title: "Pediatrician",
    },
    {
      icon: <FaBone size={40} className="text-blue-500" />,
      title: "Orthopedic",
    },
    {
      icon: <FaUserMd size={40} className="text-pink-600" />,
      title: "Dermatologist",
    },
  ];

  return (
    <section className="py-24 bg-[#f0f9ff] text-center">
      <h2 className="text-4xl font-bold mb-12">
        Doctor Specialities
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-8">
        {specialities.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div className="flex justify-center mb-4">
              {item.icon}
            </div>

            <h3 className="font-semibold text-gray-700">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}