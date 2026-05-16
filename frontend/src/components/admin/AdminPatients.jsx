// components/admin/AdminPatients.jsx

export default function AdminPatients({

  appointments = [],

}) {

  // ✅ UNIQUE PATIENTS
  const uniquePatients = [

    ...new Map(

      appointments.map((a) => [

        a.userEmail,

        a,
      ])
    ).values(),
  ];

  return (

    <div>

      <h2 className="text-3xl font-bold mb-6">

        Patients

      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {uniquePatients.map((a) => (

          <div
            key={a._id}
            className="bg-white p-5 rounded-2xl shadow"
          >

            <h3 className="text-2xl font-bold">

              {a.patientName}

            </h3>

            <p className="mt-2">
              {a.phone}
            </p>

            <p className="text-gray-500 mt-2">

              {a.userEmail}

            </p>

          </div>
        ))}

      </div>

    </div>
  );
}