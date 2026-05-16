import { useNavigate } from "react-router-dom";

export default function FeaturedDoctors() {
  const navigate = useNavigate();

  const doctors = [
    { id: 1, name: "Dr. John Doe", specialization: "Cardiologist", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Dr. Sarah Smith", specialization: "Dentist", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "Dr. Alex Johnson", specialization: "Neurologist", image: "https://randomuser.me/api/portraits/men/65.jpg" },
  ];

  const handleBook = (doc) => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login", {
        state: { from: "booking", doctor: doc },
      });
    } else {
      navigate("/booking", {
        state: { doctor: doc },
      });
    }
  };

  return (
    <section className="py-24 bg-[#f0fdfa]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">
          Meet Our Doctors
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {doctors.map((doc) => (
            <div key={doc.id} className="bg-white p-6 rounded-2xl shadow">

              <img
                src={doc.image}
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />

              <h3 className="text-xl font-bold text-center">{doc.name}</h3>
              <p className="text-center text-blue-600 mb-4">
                {doc.specialization}
              </p>

              <button
                onClick={() => handleBook(doc)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}