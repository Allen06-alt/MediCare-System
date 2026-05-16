// components/doctor/DoctorOverview.jsx

import {
  FaUserMd,
  FaClock,
} from "react-icons/fa";

import {
  FaCircleCheck,
  FaXmark,
} from "react-icons/fa6";

export default function DoctorOverview({

  appointments = [],

}) {

  // 🔥 FILTERS
  const pending =
    appointments.filter(
      (a) =>

        a.status ===
          "pending" ||

        a.status ===
          "confirmed"
    );

  const completed =
    appointments.filter(
      (a) =>
        a.status ===
        "completed"
    );

  const cancelled =
    appointments.filter(
      (a) =>
        a.status ===
        "cancelled"
    );

  return (

    <div>

      {/* 🔥 TITLE */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold">

          Doctor Dashboard 👨‍⚕️

        </h1>

        <p className="text-gray-500 mt-2">

          Manage appointments,
          patients and prescriptions

        </p>

      </div>

      {/* 🔥 STATS */}
      <div className="grid md:grid-cols-4 gap-6">

        {/* TOTAL */}
        <div className="bg-white p-6 rounded-3xl shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Total

              </p>

              <h2 className="text-4xl font-bold mt-2">

                {appointments.length}

              </h2>

            </div>

            <FaUserMd className="text-4xl text-blue-500" />

          </div>

        </div>

        {/* ACTIVE */}
        <div className="bg-white p-6 rounded-3xl shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Active

              </p>

              <h2 className="text-4xl font-bold mt-2">

                {pending.length}

              </h2>

            </div>

            <FaClock className="text-4xl text-yellow-500" />

          </div>

        </div>

        {/* COMPLETED */}
        <div className="bg-white p-6 rounded-3xl shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Completed

              </p>

              <h2 className="text-4xl font-bold mt-2">

                {completed.length}

              </h2>

            </div>

            <FaCircleCheck className="text-4xl text-green-500" />

          </div>

        </div>

        {/* CANCELLED */}
        <div className="bg-white p-6 rounded-3xl shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Cancelled

              </p>

              <h2 className="text-4xl font-bold mt-2">

                {cancelled.length}

              </h2>

            </div>

            <FaXmark className="text-4xl text-red-500" />

          </div>

        </div>

      </div>

      {/* 🔥 RECENT APPOINTMENTS */}
      <div className="bg-white rounded-3xl shadow mt-10 p-6">

        <h2 className="text-2xl font-bold mb-6">

          Recent Appointments

        </h2>

        {appointments.length === 0 ? (

          <p className="text-gray-500">

            No appointments found

          </p>

        ) : (

          <div className="space-y-5">

            {appointments
              .slice(0, 5)
              .map((a) => (

                <div
                  key={a._id}
                  className="border rounded-2xl p-5"
                >

                  <div className="flex justify-between items-center flex-wrap gap-4">

                    <div>

                      <h3 className="text-xl font-bold">

                        {a.patientName}

                      </h3>

                      <p className="text-gray-500 mt-1">

                        {a.department}

                      </p>

                    </div>

                    <div>

                      <p>

                        <b>Date:</b>{" "}
                        {a.date}

                      </p>

                      <p className="mt-1">

                        <b>Slot:</b>{" "}
                        {a.slot}

                      </p>

                    </div>

                    <div>

                      <span className={`px-4 py-2 rounded-full text-sm font-semibold

                        ${
                          a.status === "completed"

                            ? "bg-green-100 text-green-700"

                            : a.status === "cancelled"

                            ? "bg-red-100 text-red-700"

                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}>

                        {a.status}

                      </span>

                    </div>

                  </div>

                </div>
              ))}

          </div>
        )}

      </div>

    </div>
  );
}