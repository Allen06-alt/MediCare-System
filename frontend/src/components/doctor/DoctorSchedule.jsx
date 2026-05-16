// components/doctor/DoctorSchedule.jsx

export default function DoctorSchedule({

  appointments = [],

}) {

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">

        Schedule 📅

      </h1>

      {appointments.length === 0 ? (

        <div className="bg-white p-6 rounded-3xl shadow">

          No schedules available

        </div>

      ) : (

        <div className="space-y-5">

          {appointments.map((a) => (

            <div
              key={a._id}
              className="bg-white p-6 rounded-3xl shadow"
            >

              <div className="flex justify-between flex-wrap gap-4">

                <div>

                  <h2 className="text-2xl font-bold">

                    {a.patientName}

                  </h2>

                  <p className="text-gray-500 mt-2">

                    {a.department}

                  </p>

                </div>

                <div>

                  <p>

                    <b>Date:</b>{" "}
                    {a.date}

                  </p>

                  <p className="mt-2">

                    <b>Slot:</b>{" "}
                    {a.slot}

                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}