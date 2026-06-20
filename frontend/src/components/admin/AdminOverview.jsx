// components/admin/AdminOverview.jsx

import {
  useEffect,
  useState,
} from "react";

import API
from "../../api/api";

export default function AdminOverview() {

  const [
    appointments,
    setAppointments,
  ] = useState([]);

  const [
    doctors,
    setDoctors,
  ] = useState([]);

  // ✅ FETCH DATA
  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      // ✅ GET BOOKINGS
      const bookingsRes =
        await API.get(
          ""/api/bookings/admin/all"
        );

      setAppointments(
        bookingsRes.data || []
      );

      // ✅ GET DOCTORS
      const doctorsRes =
        await API.get(
          "/doctors"
        );

      setDoctors(
        doctorsRes.data || []
      );

    } catch (err) {

      console.log(err);
    }
  };

  // ✅ ONLY PAID REVENUE
  const revenue =
    appointments
      .filter(
        (a) =>
          a.paymentStatus ===
          "paid"
      )
      .reduce(
        (acc, curr) =>
          acc +
          (curr.amount || 500),
        0
      );

  // ✅ UNIQUE PATIENTS
  const patients =
    new Set(
      appointments.map(
        (a) =>
          a.userEmail
      )
    ).size;

  return (

    <div>

      {/* ✅ TITLE */}
      <h1 className="text-4xl font-bold mb-8">

        Admin Dashboard

      </h1>

      {/* ✅ STATS */}
      <div className="grid md:grid-cols-4 gap-5">

        {/* TOTAL BOOKINGS */}
        <div className="bg-blue-100 p-6 rounded-2xl shadow">

          <p className="text-gray-600">

            Total Appointments

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {appointments.length}

          </h2>

        </div>

        {/* REVENUE */}
        <div className="bg-green-100 p-6 rounded-2xl shadow">

          <p className="text-gray-600">

            Total Revenue

          </p>

          <h2 className="text-4xl font-bold mt-2 text-green-700">

            ₹ {revenue}

          </h2>

        </div>

        {/* DOCTORS */}
        <div className="bg-yellow-100 p-6 rounded-2xl shadow">

          <p className="text-gray-600">

            Doctors

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {doctors.length}

          </h2>

        </div>

        {/* PATIENTS */}
        <div className="bg-purple-100 p-6 rounded-2xl shadow">

          <p className="text-gray-600">

            Patients

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {patients}

          </h2>

        </div>

      </div>

      {/* ✅ RECENT APPOINTMENTS */}
      <div className="bg-white rounded-2xl shadow mt-8 p-6">

        <h2 className="text-2xl font-bold mb-5">

          Recent Appointments

        </h2>

        <div className="space-y-4">

          {appointments.length === 0 ? (

            <p className="text-gray-500">

              No appointments found

            </p>

          ) : (

            appointments
              .slice(0, 5)
              .map((a) => (

                <div
                  key={a._id}
                  className="border p-5 rounded-xl hover:bg-gray-50 transition"
                >

                  <p>

                    <b>Patient:</b>
                    {" "}
                    {a.patientName}

                  </p>

                  <p>

                    <b>Doctor:</b>
                    {" "}
                    {a.doctorName || "N/A"}

                  </p>

                  <p>

                    <b>Date:</b>
                    {" "}
                    {a.date}

                  </p>

                  <p>

                    <b>Slot:</b>
                    {" "}
                    {a.slot}

                  </p>

                  <p>

                    <b>Status:</b>
                    {" "}

                    <span
                      className={`font-semibold

                      ${
                        a.status ===
                        "completed"
                          ? "text-green-600"
                          : a.status ===
                            "cancelled"
                          ? "text-red-600"
                          : "text-blue-600"
                      }
                      `}
                    >

                      {a.status || "pending"}

                    </span>

                  </p>

                  <p>

                    <b>Payment:</b>
                    {" "}

                    <span
                      className={`font-semibold

                      ${
                        a.paymentStatus ===
                        "paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                      `}
                    >

                      {a.paymentStatus || "pending"}

                    </span>

                  </p>

                </div>
              ))
          )}

        </div>

      </div>

    </div>
  );
}