// components/admin/AdminDoctors.jsx

import {
  useEffect,
  useState,
} from "react";

import API
from "../../api/api";

import {
  FaEllipsisVertical,
  FaPen,
  FaTrash,
} from "react-icons/fa6";

export default function AdminDoctors() {

  // 🔥 STATES
  const [doctors,
    setDoctors] =
      useState([]);

  const [showModal,
    setShowModal] =
      useState(false);

  const [editingId,
    setEditingId] =
      useState(null);

  const [activeMenu,
    setActiveMenu] =
      useState(null);

  const [form,
    setForm] =
      useState({

        name: "",

        specialization: "",

        email: "",

        image: "",

        experience: "",
      });

  // 🔥 FETCH
  const fetchDoctors =
    async () => {

      try {

        const res =
          await API.get(
            "api/doctors"
          );

        setDoctors(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  useEffect(() => {

    fetchDoctors();

  }, []);

  // 🔥 CHANGE
  const handleChange =
    (e) => {

      setForm({

        ...form,

        [e.target.name]:
          e.target.value,
      });
    };

  // 🔥 RESET
  const resetForm =
    () => {

      setForm({

        name: "",

        specialization:
          "",

        email: "",

        image: "",

        experience: "",
      });

      setEditingId(
        null
      );

      setShowModal(
        false
      );
    };

  // 🔥 ADD
  const handleAdd =
    async () => {

      try {

        // ✅ VALIDATION
        if (
          !form.name ||
          !form.specialization ||
          !form.email ||
          !form.image ||
          !form.experience
        ) {

          alert(
            "Fill all fields ❌"
          );

          return;
        }

        const res =
          await API.post(
            "api/doctors",
            {
              ...form,

              // ✅ FIX
              experience:
                Number(
                  form.experience
                ),
            }
          );

        setDoctors([
          ...doctors,
          res.data,
        ]);

        alert(
          "Doctor added ✅"
        );

        resetForm();

      } catch (err) {

        console.log(err);
      }
    };

  // 🔥 DELETE
  const handleDelete =
    async (id) => {

      try {

        await API.delete(
          `api/doctors/${id}`
        );

        setDoctors(

          doctors.filter(
            (d) =>
              d._id !== id
          )
        );

        alert(
          "Doctor deleted ✅"
        );

      } catch (err) {

        console.log(err);
      }
    };

  // 🔥 EDIT
  const handleEdit =
    (doc) => {

      setEditingId(
        doc._id
      );

      setForm({

        name: doc.name,

        specialization:
          doc.specialization,

        email: doc.email,

        image: doc.image,

        experience:
          doc.experience,
      });

      setShowModal(
        true
      );
    };

  // 🔥 UPDATE
  const handleUpdate =
    async () => {

      try {

        // ✅ VALIDATION
        if (
          !form.name ||
          !form.specialization ||
          !form.email ||
          !form.image ||
          !form.experience
        ) {

          alert(
            "Fill all fields ❌"
          );

          return;
        }

        const res =
          await API.put(

            `/doctors/${editingId}`,

            {
              ...form,

              // ✅ FIX
              experience:
                Number(
                  form.experience
                ),
            }
          );

        setDoctors(

          doctors.map((d) =>

            d._id === editingId
              ? res.data
              : d
          )
        );

        alert(
          "Doctor updated ✅"
        );

        resetForm();

      } catch (err) {

        console.log(err);
      }
    };

  return (

    <div>

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h2 className="text-4xl font-bold">

          Doctors

        </h2>

        <button

          onClick={() =>
            setShowModal(
              true
            )
          }

          className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700"
        >

          + Add Doctor

        </button>

      </div>

      {/* 🔥 GRID */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">

        {doctors.map((doc) => (

          <div
            key={doc._id}
            className="bg-white rounded-2xl shadow border overflow-hidden relative"
          >

            {/* 🔥 IMAGE */}
            <img
              src={
                doc.image &&
                doc.image.startsWith(
                  "http"
                )

                  ? doc.image

                  : "https://via.placeholder.com/400x300?text=Doctor"
              }

              alt={doc.name}

              className="w-full h-44 object-cover"
            />

            {/* 🔥 MENU BUTTON */}
            <button

              onClick={() =>

                setActiveMenu(

                  activeMenu ===
                    doc._id

                    ? null
                    : doc._id
                )
              }

              className="absolute top-3 right-3 bg-white w-9 h-9 rounded-full shadow flex items-center justify-center"
            >

              <FaEllipsisVertical />

            </button>

            {/* 🔥 DROPDOWN */}
            {activeMenu ===
              doc._id && (

              <div className="absolute top-14 right-3 bg-white shadow-xl rounded-xl overflow-hidden z-10 border">

                {/* EDIT */}
                <button

                  onClick={() => {

                    handleEdit(
                      doc
                    );

                    setActiveMenu(
                      null
                    );
                  }}

                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 w-full text-sm"
                >

                  <FaPen />

                  Edit

                </button>

                {/* DELETE */}
                <button

                  onClick={() => {

                    handleDelete(
                      doc._id
                    );

                    setActiveMenu(
                      null
                    );
                  }}

                  className="flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-500 w-full text-sm"
                >

                  <FaTrash />

                  Delete

                </button>

              </div>
            )}

            {/* 🔥 CONTENT */}
            <div className="p-4">

              {/* NAME */}
              <h3 className="text-xl font-bold">

                {doc.name}

              </h3>

              {/* SPECIALIZATION */}
              <p className="text-blue-600 text-sm font-semibold mt-1">

                {doc.specialization}

              </p>

              {/* EMAIL */}
              <p className="text-gray-500 text-sm mt-2 break-all">

                {doc.email}

              </p>

              {/* EXPERIENCE */}
              <p className="text-sm mt-3">

                Experience:
                {" "}

                <span className="font-bold">

                  {doc.experience}
                  {" "}
                  yrs

                </span>

              </p>

            </div>

          </div>
        ))}

      </div>

      {/* 🔥 MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl">

            {/* TITLE */}
            <h2 className="text-3xl font-bold mb-6">

              {
                editingId
                  ? "Edit Doctor"
                  : "Add Doctor"
              }

            </h2>

            {/* FORM */}
            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                name="name"
                placeholder="Doctor Name"
                value={form.name}
                onChange={
                  handleChange
                }
                className="border p-4 rounded-2xl"
              />

              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={
                  form.specialization
                }
                onChange={
                  handleChange
                }
                className="border p-4 rounded-2xl"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={
                  handleChange
                }
                className="border p-4 rounded-2xl"
              />

              <input
                type="number"
                name="experience"
                placeholder="Experience"
                value={
                  form.experience
                }
                onChange={
                  handleChange
                }
                className="border p-4 rounded-2xl"
              />

            </div>

            {/* IMAGE */}
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={
                handleChange
              }
              className="border p-4 rounded-2xl w-full mt-5"
            />

            {/* BUTTONS */}
            <div className="flex justify-end gap-4 mt-8">

              <button

                onClick={
                  resetForm
                }

                className="px-6 py-3 rounded-2xl border font-semibold"
              >

                Cancel

              </button>

              <button

                onClick={
                  editingId
                    ? handleUpdate
                    : handleAdd
                }

                className={`px-6 py-3 rounded-2xl text-white font-semibold

                ${
                  editingId
                    ? "bg-yellow-500"
                    : "bg-blue-600"
                }
                `}
              >

                {
                  editingId
                    ? "Update Doctor"
                    : "Add Doctor"
                }

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}