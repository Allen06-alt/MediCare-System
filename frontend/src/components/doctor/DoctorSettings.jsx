// components/doctor/DoctorSettings.jsx

import {
  useContext,
} from "react";

import {
  AuthContext,
} from "../../context/AuthContext";

export default function DoctorSettings() {

  const { user } =
    useContext(
      AuthContext
    );

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">

        Settings ⚙️

      </h1>

      <div className="bg-white p-8 rounded-3xl shadow max-w-2xl">

        <div className="space-y-5">

          <div>

            <p className="text-gray-500">

              Name

            </p>

            <h2 className="text-2xl font-bold">

              {user?.name}

            </h2>

          </div>

          <div>

            <p className="text-gray-500">

              Email

            </p>

            <h2 className="text-2xl font-bold">

              {user?.email}

            </h2>

          </div>

          <div>

            <p className="text-gray-500">

              Role

            </p>

            <h2 className="text-2xl font-bold capitalize">

              {user?.role}

            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}