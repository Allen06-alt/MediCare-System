// components/doctor/DoctorPrescriptions.jsx

import {
  useNavigate,
} from "react-router-dom";

import {
  FaFilePrescription,
  FaCalendarAlt,
  FaUserInjured,
} from "react-icons/fa";

export default function DoctorPrescriptions({

  appointments = [],

}) {

  const navigate =
    useNavigate();

  // ✅ COMPLETED APPOINTMENTS ONLY
  const completed =
    appointments.filter(
      (a) =>
        a.status ===
        "completed"
    );

  return (

    <div className="space-y-6">

      {/* 🔥 HEADER */}
      <div className="bg-white rounded-3xl shadow p-8 flex justify-between items-center flex-wrap gap-5">

        <div>

          <h1 className="text-3xl font-bold">

            Prescriptions

          </h1>

          <p className="text-gray-500 mt-2">

            Manage completed patient prescriptions

          </p>

        </div>

        <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-semibold">

          {completed.length}
          {" "}
          Completed

        </div>

      </div>

      {/* 🔥 EMPTY STATE */}
      {completed.length === 0 ? (

        <div className="bg-white rounded-3xl shadow p-16 text-center">

          <FaFilePrescription
            className="text-6xl text-gray-300 mx-auto mb-5"
          />

          <h2 className="text-2xl font-bold mb-3">

            No Prescriptions Available

          </h2>

          <p className="text-gray-500">

            Completed appointments will appear here

          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {completed.map((a) => (

            <div
              key={a._id}
              className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex justify-between items-center flex-wrap gap-6"
            >

              {/* 🔥 LEFT */}
              <div>

                <div className="flex items-center gap-3 mb-3">

                  <FaUserInjured
                    className="text-blue-600 text-xl"
                  />

                  <h2 className="text-2xl font-bold">

                    {a.patientName}

                  </h2>

                </div>

                <p className="text-gray-500 mb-4">

                  {a.department}

                </p>

                <div className="flex flex-wrap gap-5 text-sm text-gray-600">

                  <p className="flex items-center gap-2">

                    <FaCalendarAlt />

                    {a.date}

                  </p>

                  <p>

                    <b>Slot:</b>
                    {" "}
                    {a.slot}

                  </p>

                </div>

              </div>

              {/* 🔥 RIGHT */}
              <div className="flex items-center gap-4 flex-wrap">

                {/* STATUS */}
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">

                  Completed

                </span>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    navigate(
                      `/doctor/prescription/${a._id}`
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all"
                >

                  Open Prescription

                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}