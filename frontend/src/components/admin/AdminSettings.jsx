// components/admin/AdminSettings.jsx

import {
  useContext,
  useState,
} from "react";

import {
  AuthContext,
} from "../../context/AuthContext";

export default function AdminSettings() {

  // ✅ AUTH
  const { user } =
    useContext(
      AuthContext
    );

  // ✅ STATES
  const [name,
    setName] =
      useState(
        user?.name || ""
      );

  const [email,
    setEmail] =
      useState(
        user?.email || ""
      );

  // ✅ SAVE
  const handleSave =
    () => {

      alert(
        "Settings Updated ✅"
      );
    };

  return (

    <div>

      {/* 🔥 TITLE */}
      <h2 className="text-4xl font-bold mb-8">

        Admin Settings

      </h2>

      {/* 🔥 CARD */}
      <div className="bg-white rounded-3xl shadow p-8 max-w-3xl">

        {/* 🔥 PROFILE */}
        <div className="flex items-center gap-5 mb-10">

          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700">

            {name?.charAt(0)}

          </div>

          <div>

            <h3 className="text-2xl font-bold">

              {name}

            </h3>

            <p className="text-gray-500">

              Administrator

            </p>

          </div>

        </div>

        {/* 🔥 FORM */}
        <div className="space-y-6">

          {/* NAME */}
          <div>

            <label className="block mb-2 font-semibold">

              Admin Name

            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="block mb-2 font-semibold">

              Admin Email

            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block mb-2 font-semibold">

              Change Password

            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* BUTTON */}
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition"
          >

            Save Settings

          </button>

        </div>

      </div>

    </div>
  );
}