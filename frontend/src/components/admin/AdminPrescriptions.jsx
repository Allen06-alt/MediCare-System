// components/admin/AdminPrescriptions.jsx

import {
  useEffect,
  useState,
} from "react";

import API
from "../../api/api";

export default function AdminPrescriptions() {

  const [
    prescriptions,
    setPrescriptions,
  ] = useState([]);

  useEffect(() => {

    API.get("api/prescriptions")
      .then((res) => {

        setPrescriptions(
          res.data
        );

      })
      .catch(console.log);

  }, []);

  return (

    <div>

      <h2 className="text-3xl font-bold mb-6">

        Prescriptions

      </h2>

      <div className="grid gap-5">

        {prescriptions.map((p) => (

          <div
            key={p._id}
            className="bg-white p-6 rounded-2xl shadow border"
          >

            <div className="flex justify-between items-start flex-wrap gap-4">

              <div>

                <h3 className="text-xl font-bold">

                  {p.patientName}

                </h3>

                <p className="text-gray-500 mt-1">

                  Doctor:
                  {" "}
                  {p.doctorName}

                </p>

              </div>

              <div className="text-sm text-gray-400">

                {p.date}

              </div>

            </div>

            <div className="mt-5 space-y-3">

              <p>

                <b>
                  Medicines:
                </b>
                {" "}
                {p.medicines}

              </p>

              <p>

                <b>
                  Notes:
                </b>
                {" "}
                {p.notes}

              </p>

              <p>

                <b>
                  Advice:
                </b>
                {" "}
                {p.advice}

              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}