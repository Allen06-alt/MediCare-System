import { useNavigate } from "react-router-dom";

export default function DoctorCard({ doc }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <img
        src={doc.image}
        className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
      />

      <h3 className="text-xl font-bold text-center">{doc.name}</h3>
      <p className="text-center text-blue-600 mb-4">
        {doc.specialization}
      </p>

      <button
        onClick={() => navigate(`/doctors/${doc._id}`)}
        className="w-full bg-gray-800 text-white py-3 rounded-xl"
      >
        View Profile
      </button>

    </div>
  );
}