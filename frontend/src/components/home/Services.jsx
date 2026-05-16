import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-[#f0f9ff] text-center">
      <h2 className="text-4xl font-bold mb-10">
        Our Services
      </h2>

      <button
        onClick={() => navigate("/services")}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        View All Services
      </button>
    </section>
  );
}