// components/admin/AdminAppointments.jsx

export default function AdminAppointments({

  appointments = [],

}) {

  return (

    <div>

      <h2 className="text-3xl font-bold mb-6">

        All Appointments

      </h2>

      <div className="bg-white rounded-2xl shadow overflow-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Patient
              </th>

              <th className="p-4 text-left">
                Doctor
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Slot
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Payment
              </th>

            </tr>

          </thead>

          <tbody>

            {appointments.map((a) => (

              <tr
                key={a._id}
                className="border-b"
              >

                <td className="p-4">
                  {a.patientName}
                </td>

                <td className="p-4">
                  {a.doctorName}
                </td>

                <td className="p-4">
                  {a.date}
                </td>

                <td className="p-4">
                  {a.slot}
                </td>

                <td className="p-4 capitalize">
                  {a.status}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold

                    ${
                      a.paymentStatus ===
                      "paid"

                        ? "bg-green-100 text-green-700"

                        : "bg-red-100 text-red-700"
                    }
                    `}
                  >

                    {a.paymentStatus ||
                      "pending"}

                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}