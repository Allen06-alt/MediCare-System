import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DoctorInfo from "../../components/doctors/DoctorInfo";
import Availability from "../../components/doctors/Availability";
import API from "../../api/api";

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await API.get(`/doctors/${id}`);
        setDoctor(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleBooking = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login", {
        state: {
          from: "/booking", // 🔥 FIXED
          doctor,
        },
      });
    } else {
      navigate("/booking", {
        state: {
          doctor,
        },
      });
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!doctor) return <p className="text-center mt-20">Doctor not found</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">

      <DoctorInfo doctor={doctor} />

      <div className="max-w-5xl mx-auto">
        <Availability />
      </div>

      <div className="text-center mt-10">
        <button
          onClick={handleBooking}
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition"
        >
          Continue to Booking
        </button>
      </div>

    </div>
  );
}