import { useState } from "react";

import API from "../../api/api";

export default function AppointmentList({
  appointments,
  family,
  refresh,
}) {

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState({
      slot: "",
    });

  // 🔥 FILTER STATE
  const [filter, setFilter] =
    useState("all");

  // 🔥 FILTER LOGIC
  const filteredAppointments =
    appointments.filter((a) => {

      if (filter === "all")
        return true;

      if (filter === "self")
        return (
          a.patientType === "self"
        );

      return (
        a.patientId === filter
      );
    });

  // 🔥 CANCEL
  const handleCancel =
    async (id) => {

      if (
        !window.confirm(
          "Cancel this appointment?"
        )
      ) {
        return;
      }

      try {

        // 🔥 STATUS CANCEL
        await API.put(
          `"/api/bookings/${id}/cancel`
        );

        alert(
          "Appointment cancelled ✅"
        );

        refresh();

      } catch (err) {

        console.log(err);

        alert(
          "Cancel failed ❌"
        );
      }
    };

  // 🔥 EDIT
  const handleEdit = (a) => {

    // ❌ DON'T EDIT COMPLETED
    if (
      a.status === "completed"
    ) {
      return alert(
        "Completed appointment cannot be edited ❌"
      );
    }

    // ❌ DON'T EDIT CANCELLED
    if (
      a.status === "cancelled"
    ) {
      return alert(
        "Cancelled appointment cannot be edited ❌"
      );
    }

    setEditingId(a._id);

    setForm({
      slot: a.slot,
    });
  };

  // 🔥 UPDATE
  const handleUpdate =
    async (id) => {

      try {

        await API.put(
          `"/api/bookings/${id}`,
          form
        );

        alert(
          "Appointment updated ✅"
        );

        setEditingId(null);

        refresh();

      } catch (err) {

        console.log(err);

        alert(
          "Update failed ❌"
        );
      }
    };

  // 🔥 DOWNLOAD PDF
  const handleDownload =
    async (id) => {

      try {

        const res =
          await API.get(

            `/prescriptions/download/${id}`,

            {
              responseType:
                "blob",
            }
          );

        // 🔥 CREATE URL
        const url =
          window.URL.createObjectURL(

            new Blob([res.data])
          );

        // 🔥 CREATE LINK
        const link =
          document.createElement(
            "a"
          );

        link.href = url;

        link.setAttribute(
          "download",
          "prescription.pdf"
        );

        document.body.appendChild(
          link
        );

        link.click();

      } catch (err) {

        console.log(err);

        alert(
          "Download failed ❌"
        );
      }
    };

  // 🔥 STATUS COLORS
  const getStatusColor =
    (status) => {

      switch (status) {

        case "pending":
          return "bg-yellow-100 text-yellow-700";

        case "confirmed":
          return "bg-blue-100 text-blue-700";

        case "completed":
          return "bg-green-100 text-green-700";

        case "cancelled":
          return "bg-red-100 text-red-700";

        default:
          return "bg-gray-100 text-gray-700";
      }
    };

  return (

    <div>

      {/* 🔥 TITLE */}
      <h2 className="text-2xl font-bold mb-6">

        My Appointments

      </h2>

      {/* 🔥 FILTER */}
      <div className="mb-6 flex gap-2 flex-wrap">

        <button
          onClick={() =>
            setFilter("all")
          }
          className={`px-4 py-2 rounded-xl border font-semibold

          ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-white"
          }
          `}
        >

          All

        </button>

        <button
          onClick={() =>
            setFilter("self")
          }
          className={`px-4 py-2 rounded-xl border font-semibold

          ${
            filter === "self"
              ? "bg-blue-600 text-white"
              : "bg-white"
          }
          `}
        >

          Self

        </button>

        {family.map((f) => (

          <button
            key={f._id}

            onClick={() =>
              setFilter(f._id)
            }

            className={`px-4 py-2 rounded-xl border font-semibold

            ${
              filter === f._id
                ? "bg-blue-600 text-white"
                : "bg-white"
            }
            `}
          >

            {f.name}

          </button>
        ))}

      </div>

      {/* 🔥 LIST */}
      {filteredAppointments.length === 0 ? (

        <div className="bg-white p-6 rounded-2xl shadow">

          <p>

            No appointments

          </p>

        </div>

      ) : (

        filteredAppointments.map((a) => (

          <div
            key={a._id}
            className="bg-white p-5 rounded-2xl shadow mb-5 border"
          >

            {/* 🔥 TOP */}
            <div className="flex justify-between items-start flex-wrap gap-4">

              <div>

                <p className="text-xl font-bold">

                  {a.patientName}

                </p>

                <p className="text-gray-500">

                  {a.patientType}

                </p>

              </div>

              {/* 🔥 STATUS */}
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(a.status)}`}
              >

                {a.status.toUpperCase()}

              </span>

            </div>

            {/* 🔥 DETAILS */}
            <div className="mt-4 space-y-2 text-gray-700">

              <p>

                <b>Doctor:</b>{" "}

                {a.doctorName ||
                  a.doctor?.name}

              </p>

              <p>

                <b>Department:</b>{" "}

                {a.department}

              </p>

              <p>

                <b>Date:</b>{" "}

                {a.date}

              </p>

              {/* 🔥 SLOT EDIT */}
              {editingId === a._id ? (

                <div className="flex gap-2 items-center">

                  <input
                    value={form.slot}

                    onChange={(e) =>
                      setForm({
                        ...form,
                        slot:
                          e.target.value,
                      })
                    }

                    className="border p-2 rounded-lg"
                  />

                  <button
                    onClick={() =>
                      handleUpdate(
                        a._id
                      )
                    }

                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >

                    Save

                  </button>

                </div>

              ) : (

                <p>

                  <b>Slot:</b>{" "}

                  {a.slot}

                </p>
              )}

              {/* 🔥 PRESCRIPTION */}
{a.prescriptionId && (

  <div className="bg-green-50 border border-green-200 p-4 rounded-xl mt-4">

    <h3 className="font-bold text-green-700 mb-2">

      Prescription Available

    </h3>

    <p className="text-gray-700">

      Doctor uploaded your prescription.

    </p>

    {/* 🔥 DOWNLOAD BUTTON */}
    <button
      onClick={() =>
        handleDownload(
          a.prescriptionId
        )
      }

      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold"
    >

      Download PDF

    </button>

  </div>
)}

            </div>

            {/* 🔥 ACTIONS */}
            <div className="mt-6 flex gap-3 flex-wrap">

              {/* 🔥 EDIT */}
              {a.status !==
                "completed" &&
                a.status !==
                  "cancelled" && (

                <button
                  onClick={() =>
                    handleEdit(a)
                  }

                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold"
                >

                  Edit

                </button>
              )}

              {/* 🔥 CANCEL */}
              {a.status !==
                "completed" &&
                a.status !==
                  "cancelled" && (

                <button
                  onClick={() =>
                    handleCancel(
                      a._id
                    )
                  }

                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold"
                >

                  Cancel

                </button>
              )}

            </div>

          </div>
        ))
      )}

    </div>
  );
}