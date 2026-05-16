import { useNavigate } from "react-router-dom";

import StatsCard from "./StatsCard";
import ProfileCard from "./ProfileCard";

export default function Overview({
  user,
  appointments,
}) {

  const navigate =
    useNavigate();

  // 🔥 SORT APPOINTMENTS
  const sortedAppointments =
    [...appointments].sort(
      (a, b) =>
        new Date(
          b.createdAt
        ) -
        new Date(
          a.createdAt
        )
    );

  // 🔥 LATEST
  const next =
    sortedAppointments[0];

  // 🔥 STATUS COUNTS
  const pending =
    appointments.filter(
      (a) =>
        a.status ===
        "pending"
    ).length;

  const confirmed =
    appointments.filter(
      (a) =>
        a.status ===
        "confirmed"
    ).length;

  const completed =
    appointments.filter(
      (a) =>
        a.status ===
        "completed"
    ).length;

  const cancelled =
    appointments.filter(
      (a) =>
        a.status ===
        "cancelled"
    ).length;

  // 🔥 STATUS COLORS
  const getStatusColor =
    (status) => {

      switch (status) {

        case "pending":
          return "text-yellow-600";

        case "confirmed":
          return "text-blue-600";

        case "completed":
          return "text-green-600";

        case "cancelled":
          return "text-red-600";

        default:
          return "text-gray-600";
      }
    };

  return (

    <div>

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">

        <h1 className="text-3xl font-bold">

          Welcome, {user?.name} 👋

        </h1>

        <button
          onClick={() =>
            navigate(
              "/booking"
            )
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
        >

          + Book Appointment

        </button>

      </div>

      {/* 🔥 PROFILE */}
      <ProfileCard
        user={user}
      />

      {/* 🔥 STATS */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <StatsCard
          title="Pending"
          value={pending}
        />

        <StatsCard
          title="Confirmed"
          value={confirmed}
        />

        <StatsCard
          title="Completed"
          value={completed}
        />

        <StatsCard
          title="Cancelled"
          value={cancelled}
        />

      </div>

      {/* 🔥 LATEST APPOINTMENT */}
      <div className="bg-white p-6 rounded-2xl shadow border">

        <h2 className="font-bold mb-5 text-2xl">

          Latest Appointment

        </h2>

        {next ? (

          <div className="space-y-3 text-gray-700">

            <p>

              <b>Doctor:</b>{" "}

              {next.doctorName ||
                next.doctor?.name ||
                "Not Assigned"}

            </p>

            <p>

              <b>Department:</b>{" "}

              {next.department}

            </p>

            <p>

              <b>Date:</b>{" "}

              {next.date}

            </p>

            <p>

              <b>Slot:</b>{" "}

              {next.slot}

            </p>

            <p>

              <b>Status:</b>{" "}

              <span
                className={`font-bold ${getStatusColor(next.status)}`}
              >

                {next.status?.toUpperCase()}

              </span>

            </p>

          </div>

        ) : (

          <p>

            No appointment booked

          </p>
        )}

      </div>

    </div>
  );
}