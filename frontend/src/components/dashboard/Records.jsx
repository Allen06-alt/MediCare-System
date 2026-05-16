export default function Records({

  appointments,

}) {

  // 🔥 COMPLETED ONLY
  const completedAppointments =
    appointments.filter(

      (a) =>
        a.status ===
        "completed"
    );

  return (

    <div className="max-w-6xl">

      {/* 🔥 TITLE */}
      <h1 className="text-3xl font-bold mb-6">

        Medical Records 📋

      </h1>

      {/* 🔥 EMPTY */}
      {completedAppointments.length === 0 ? (

        <div className="bg-white p-6 rounded-2xl shadow border">

          <p className="text-gray-500">

            No medical records found

          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-5">

          {completedAppointments.map((a) => (

            <div
              key={a._id}
              className="bg-white p-6 rounded-2xl shadow border hover:shadow-lg transition"
            >

              {/* 🔥 HEADER */}
              <div className="flex justify-between items-start mb-4">

                <div>

                  <h2 className="text-xl font-bold text-gray-800">

                    {a.doctor?.name ||
                      "Doctor"}

                  </h2>

                  <p className="text-blue-600 font-medium">

                    {a.department}

                  </p>

                </div>

                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">

                  COMPLETED

                </span>

              </div>

              {/* 🔥 DETAILS */}
              <div className="space-y-3 text-gray-700">

                <p>

                  <b>Date:</b>{" "}
                  {a.date}

                </p>

                <p>

                  <b>Slot:</b>{" "}
                  {a.slot}

                </p>

                <p>

                  <b>Symptoms:</b>{" "}
                  {a.symptoms ||
                    "No symptoms"}

                </p>

              </div>

              {/* 🔥 PRESCRIPTION */}
              {a.prescription && (

                <div className="mt-5 border-t pt-4">

                  <h3 className="text-lg font-bold text-green-700 mb-3">

                    Prescription 💊

                  </h3>

                  <div className="space-y-2 text-gray-700">

                    <p>

                      <b>Medicines:</b>{" "}
                      {
                        a.prescription
                          .medicines
                      }

                    </p>

                    <p>

                      <b>Notes:</b>{" "}
                      {
                        a.prescription
                          .notes
                      }

                    </p>

                    <p>

                      <b>Advice:</b>{" "}
                      {
                        a.prescription
                          .advice
                      }

                    </p>

                  </div>

                </div>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}