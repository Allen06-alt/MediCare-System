import {
  useNavigate,
} from "react-router-dom";

export default function DoctorAppointments({
  appointments = [],
}) {

  const navigate =
    useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow p-8">

      <h1 className="text-3xl font-bold mb-8">
        All Appointments
      </h1>

      {appointments.length === 0 ? (

        <p>No appointments found</p>

      ) : (

        <div className="space-y-5">

          {appointments.map((a) => (

            <div
              key={a._id}
              className="border rounded-2xl p-5 flex justify-between items-center flex-wrap gap-5"
            >

              <div>

                <h2 className="text-xl font-bold">
                  {a.patientName}
                </h2>

                <p className="text-gray-500">
                  {a.department}
                </p>

                <p className="mt-2">
                  <b>Date:</b> {a.date}
                </p>

                <p>
                  <b>Slot:</b> {a.slot}
                </p>

              </div>

              <button
                onClick={() =>
                  navigate(
                    `/doctor/prescription/${a._id}`
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
              >
                Open Prescription
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}