// pages/doctor/PrescriptionForm.jsx

import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import API
from "../../api/api";

import {
  AuthContext,
} from "../../context/AuthContext";

export default function PrescriptionForm() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  // ✅ AUTH
  const { user } =
    useContext(
      AuthContext
    );

  // 🔥 STATES
  const [appointment,
    setAppointment] =
      useState(null);

  const [medicines,
    setMedicines] =
      useState("");

  const [notes,
    setNotes] =
      useState("");

  const [advice,
    setAdvice] =
      useState("");

  const [loading,
    setLoading] =
      useState(false);

  // 🔥 FETCH APPOINTMENT
  useEffect(() => {

    const fetchAppointment =
      async () => {

        try {

          const res =
            await API.get(
              `/bookings/single/${id}`
            );

          setAppointment(
            res.data
          );

        } catch (err) {

          console.log(err);
        }
      };

    fetchAppointment();

  }, [id]);

  // 🔥 SAVE PRESCRIPTION
  const handleSave =
    async () => {

      // ✅ VALIDATION
      if (
        !medicines ||
        !notes ||
        !advice
      ) {

        return alert(
          "Fill all fields ❌"
        );
      }

      try {

        setLoading(true);

        // ✅ SAVE PRESCRIPTION
        await API.post(

          "/prescriptions",

          {
            bookingId:
              appointment._id,

            patientName:
              appointment.patientName,

            patientEmail:
              appointment.userEmail,

            // ✅ LOGGED IN DOCTOR
            doctorName:
              user?.name,

            disease:
              appointment.symptoms,

            medicines,

            notes,

            advice,
          }
        );

        // ✅ UPDATE BOOKING
        await API.put(

          `/bookings/${id}/prescription`,

          {
            medicines,
            notes,
            advice,
            status:
              "completed",
          }
        );

        alert(
          "Prescription Saved ✅"
        );

        // ✅ REDIRECT
        navigate(
          "/doctor"
        );

      } catch (err) {

        console.log(err);

        alert(
          err.response?.data
            ?.message ||
          "Prescription failed ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  // 🔥 LOADING
  if (!appointment) {

    return (

      <div className="p-10 text-center text-xl">

        Loading...

      </div>
    );
  }

  return (

    <div className="max-w-4xl mx-auto py-10 px-4">

      {/* 🔥 HEADER */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Create Prescription

        </h1>

        <p className="text-gray-500 mt-2">

          Add medicines and advice for patient

        </p>

      </div>

      {/* 🔥 APPOINTMENT DETAILS */}
      <div className="bg-white shadow rounded-3xl p-6 mb-8">

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <p className="mb-3">
              <b>Patient:</b>{" "}
              {appointment.patientName}
            </p>

            <p className="mb-3">
              <b>Doctor:</b>{" "}
              {user?.name}
            </p>

            <p className="mb-3">
              <b>Department:</b>{" "}
              {appointment.department}
            </p>

          </div>

          <div>

            <p className="mb-3">
              <b>Symptoms:</b>{" "}
              {appointment.symptoms}
            </p>

            <p className="mb-3">
              <b>Date:</b>{" "}
              {appointment.date}
            </p>

            <p className="mb-3">
              <b>Slot:</b>{" "}
              {appointment.slot}
            </p>

          </div>

        </div>

      </div>

      {/* 🔥 FORM */}
      <div className="bg-white shadow rounded-3xl p-6 space-y-6">

        {/* 🔥 MEDICINES */}
        <div>

          <label className="font-semibold block mb-2">

            Medicines

          </label>

          <textarea
            placeholder="Enter medicines..."
            value={medicines}
            onChange={(e) =>
              setMedicines(
                e.target.value
              )
            }
            className="w-full border p-4 rounded-2xl min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* 🔥 NOTES */}
        <div>

          <label className="font-semibold block mb-2">

            Notes

          </label>

          <textarea
            placeholder="Enter notes..."
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
            className="w-full border p-4 rounded-2xl min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* 🔥 ADVICE */}
        <div>

          <label className="font-semibold block mb-2">

            Advice

          </label>

          <textarea
            placeholder="Enter advice..."
            value={advice}
            onChange={(e) =>
              setAdvice(
                e.target.value
              )
            }
            className="w-full border p-4 rounded-2xl min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* 🔥 BUTTON */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold transition"
        >

          {loading
            ? "Saving..."
            : "Save Prescription"}

        </button>

      </div>

    </div>
  );
}