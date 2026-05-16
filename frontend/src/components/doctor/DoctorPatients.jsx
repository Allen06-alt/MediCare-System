// components/doctor/DoctorPatients.jsx

export default function DoctorPatients({

  appointments = [],

}) {

  // ✅ UNIQUE PATIENTS
  const patients = [

    ...new Map(

      appointments.map((a) => [

        a.userEmail,

        a,
      ])
    ).values(),
  ];

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">

        Patients 👨‍👩‍👧

      </h1>

      {patients.length === 0 ? (

        <div className="bg-white p-6 rounded-3xl shadow">

          No patients found

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {patients.map((p) => (

            <div
              key={p._id}
              className="bg-white p-6 rounded-3xl shadow"
            >

              <h2 className="text-2xl font-bold">

                {p.patientName}

              </h2>

              <p className="text-gray-500 mt-2">

                {p.userEmail}

              </p>

              <p className="mt-2">

                <b>Phone:</b>{" "}
                {p.phone}

              </p>

              <p className="mt-2">

                <b>Department:</b>{" "}
                {p.department}

              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}