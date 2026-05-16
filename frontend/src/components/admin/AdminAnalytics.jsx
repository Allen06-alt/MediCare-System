// components/admin/AdminAnalytics.jsx

export default function AdminAnalytics({

  appointments = [],

}) {

  // ✅ STATS
  const total =
    appointments.length;

  const paid =
    appointments.filter(
      (a) =>
        a.paymentStatus ===
        "paid"
    ).length;

  const pending =
    appointments.filter(
      (a) =>
        a.status ===
        "pending"
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

  // ✅ REVENUE
  const revenue =
    appointments
      .filter(
        (a) =>
          a.paymentStatus ===
          "paid"
      )
      .reduce(
        (acc, curr) =>
          acc +
          (curr.amount || 500),
        0
      );

  // ✅ SAFE %
  const completedPercent =
    total > 0
      ? (completed / total) * 100
      : 0;

  const pendingPercent =
    total > 0
      ? (pending / total) * 100
      : 0;

  const cancelledPercent =
    total > 0
      ? (cancelled / total) * 100
      : 0;

  return (

    <div>

      {/* 🔥 TITLE */}
      <h2 className="text-4xl font-bold mb-8">

        Analytics Dashboard

      </h2>

      {/* 🔥 CARDS */}
      <div className="grid md:grid-cols-4 gap-6">

        {/* TOTAL */}
        <div className="bg-blue-100 p-6 rounded-3xl">

          <p className="text-gray-600 text-lg">

            Total Appointments

          </p>

          <h1 className="text-5xl font-bold mt-3 text-blue-700">

            {total}

          </h1>

        </div>

        {/* PAID */}
        <div className="bg-green-100 p-6 rounded-3xl">

          <p className="text-gray-600 text-lg">

            Paid Bookings

          </p>

          <h1 className="text-5xl font-bold mt-3 text-green-700">

            {paid}

          </h1>

        </div>

        {/* PENDING */}
        <div className="bg-yellow-100 p-6 rounded-3xl">

          <p className="text-gray-600 text-lg">

            Pending Cases

          </p>

          <h1 className="text-5xl font-bold mt-3 text-yellow-700">

            {pending}

          </h1>

        </div>

        {/* REVENUE */}
        <div className="bg-purple-100 p-6 rounded-3xl">

          <p className="text-gray-600 text-lg">

            Revenue

          </p>

          <h1 className="text-5xl font-bold mt-3 text-purple-700">

            ₹ {revenue}

          </h1>

        </div>

      </div>

      {/* 🔥 STATUS */}
      <div className="bg-white mt-10 rounded-3xl shadow p-8">

        <h3 className="text-3xl font-bold mb-8">

          Appointment Status

        </h3>

        <div className="space-y-8">

          {/* COMPLETED */}
          <div>

            <div className="flex justify-between mb-2">

              <p className="font-semibold">

                Completed

              </p>

              <p className="text-green-600 font-bold">

                {completed}

              </p>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-5">

              <div
                className="bg-green-500 h-5 rounded-full transition-all"
                style={{
                  width:
                    `${completedPercent}%`,
                }}
              />

            </div>

          </div>

          {/* PENDING */}
          <div>

            <div className="flex justify-between mb-2">

              <p className="font-semibold">

                Pending

              </p>

              <p className="text-yellow-600 font-bold">

                {pending}

              </p>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-5">

              <div
                className="bg-yellow-500 h-5 rounded-full transition-all"
                style={{
                  width:
                    `${pendingPercent}%`,
                }}
              />

            </div>

          </div>

          {/* CANCELLED */}
          <div>

            <div className="flex justify-between mb-2">

              <p className="font-semibold">

                Cancelled

              </p>

              <p className="text-red-600 font-bold">

                {cancelled}

              </p>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-5">

              <div
                className="bg-red-500 h-5 rounded-full transition-all"
                style={{
                  width:
                    `${cancelledPercent}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}