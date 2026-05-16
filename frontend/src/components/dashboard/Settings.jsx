import {
  useContext,
  useState,
} from "react";

import {
  AuthContext,
} from "../../context/AuthContext";

export default function Settings() {

  const {
    user,
    updateUser,
  } = useContext(
    AuthContext
  );

  // 🔥 STATES
  const [name,
    setName] =
      useState(
        user?.name || ""
      );

  const [email] =
    useState(
      user?.email || ""
    );

  const [loading,
    setLoading] =
      useState(false);

  // 🔥 SAVE
  const handleSave =
    async () => {

      if (!name) {

        return alert(
          "Name is required ❌"
        );
      }

      try {

        setLoading(true);

        // ✅ UPDATE CONTEXT
        updateUser({

          ...user,

          name,
        });

        // ✅ UPDATE LOCAL STORAGE
        localStorage.setItem(

          "user",

          JSON.stringify({

            ...user,

            name,
          })
        );

        alert(
          "Profile updated ✅"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Update failed ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="max-w-3xl">

      {/* 🔥 TITLE */}
      <h1 className="text-3xl font-bold mb-6">

        Settings ⚙️

      </h1>

      {/* 🔥 CARD */}
      <div className="bg-white p-8 rounded-2xl shadow border">

        {/* 🔥 PROFILE */}
        <div className="mb-8">

          <h2 className="text-xl font-bold mb-5">

            Profile Settings

          </h2>

          <div className="space-y-5">

            {/* NAME */}
            <div>

              <label className="block mb-2 font-medium text-gray-700">

                Full Name

              </label>

              <input
                type="text"

                value={name}

                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }

                className="w-full border p-4 rounded-xl outline-none focus:border-blue-500"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="block mb-2 font-medium text-gray-700">

                Email Address

              </label>

              <input
                type="email"

                value={email}

                disabled

                className="w-full border p-4 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
              />

            </div>

          </div>

        </div>

        {/* 🔥 BUTTON */}
        <button
          onClick={handleSave}

          disabled={loading}

          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >

          {loading
            ? "Saving..."
            : "Save Changes"}

        </button>

      </div>

    </div>
  );
}