import {
  useEffect,
  useState,
  useContext,
} from "react";

import API from "../../api/api";

import {
  AuthContext,
} from "../../context/AuthContext";

export default function Family() {

  const { user } =
    useContext(
      AuthContext
    );

  // 🔥 STATES
  const [members,
    setMembers] =
      useState([]);

  const [form,
    setForm] =
      useState({

        name: "",

        age: "",

        relation: "",
      });

  const [loading,
    setLoading] =
      useState(false);

  // 🔥 FETCH FAMILY
  const fetchFamily =
    async () => {

      try {

        const res =
          await API.get(
            `/family/${user.email}`
          );

        setMembers(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  // 🔥 USE EFFECT
  useEffect(() => {

    if (user?.email) {

      fetchFamily();
    }

  }, [user]);

  // 🔥 ADD FAMILY
  const handleAdd =
    async () => {

      // ✅ VALIDATION
      if (
        !form.name ||
        !form.age ||
        !form.relation
      ) {

        return alert(
          "Please fill all fields ❌"
        );
      }

      try {

        setLoading(true);

        const res =
          await API.post(
            "/family",
            {

              ...form,

              userEmail:
                user.email,
            }
          );

        // ✅ UPDATE UI
        setMembers([
          ...members,
          res.data,
        ]);

        // ✅ CLEAR FORM
        setForm({

          name: "",

          age: "",

          relation: "",
        });

        alert(
          "Family member added ✅"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Add failed ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  // 🔥 DELETE
  const handleDelete =
    async (id) => {

      try {

        await API.delete(
          `/family/${id}`
        );

        // ✅ REMOVE UI
        setMembers(

          members.filter(
            (m) =>
              m._id !== id
          )
        );

        alert(
          "Family member removed ✅"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Delete failed ❌"
        );
      }
    };

  return (

    <div className="max-w-5xl">

      {/* 🔥 TITLE */}
      <h2 className="text-3xl font-bold mb-6">

        Family Members 👨‍👩‍👧‍👦

      </h2>

      {/* 🔥 FORM */}
      <div className="bg-white p-6 rounded-2xl shadow border mb-8">

        <h3 className="text-xl font-semibold mb-5">

          Add Family Member

        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          {/* NAME */}
          <input
            type="text"

            placeholder="Name"

            value={form.name}

            onChange={(e) =>
              setForm({

                ...form,

                name:
                  e.target.value,
              })
            }

            className="border p-3 rounded-xl outline-none focus:border-blue-500"
          />

          {/* AGE */}
          <input
            type="number"

            placeholder="Age"

            value={form.age}

            onChange={(e) =>
              setForm({

                ...form,

                age:
                  e.target.value,
              })
            }

            className="border p-3 rounded-xl outline-none focus:border-blue-500"
          />

          {/* RELATION */}
          <input
            type="text"

            placeholder="Relation"

            value={form.relation}

            onChange={(e) =>
              setForm({

                ...form,

                relation:
                  e.target.value,
              })
            }

            className="border p-3 rounded-xl outline-none focus:border-blue-500"
          />

        </div>

        {/* 🔥 BUTTON */}
        <button
          onClick={handleAdd}

          disabled={loading}

          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >

          {loading
            ? "Adding..."
            : "Add Member"}

        </button>

      </div>

      {/* 🔥 LIST */}
      {members.length === 0 ? (

        <div className="bg-white p-6 rounded-2xl shadow border">

          <p className="text-gray-500">

            No family members added

          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-5">

          {members.map((m) => (

            <div
              key={m._id}
              className="bg-white p-5 rounded-2xl shadow border"
            >

              <div className="space-y-2">

                <p className="text-xl font-bold text-gray-800">

                  {m.name}

                </p>

                <p className="text-gray-600">

                  <b>Age:</b>{" "}
                  {m.age}

                </p>

                <p className="text-gray-600">

                  <b>Relation:</b>{" "}
                  {m.relation}

                </p>

              </div>

              {/* 🔥 DELETE BUTTON */}
              <button
                onClick={() =>
                  handleDelete(
                    m._id
                  )
                }

                className="mt-5 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold"
              >

                Remove

              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}