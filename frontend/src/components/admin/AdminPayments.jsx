// components/admin/AdminPayments.jsx

import {
  useEffect,
  useState,
} from "react";

import API from "../../api/api";

export default function AdminPayments() {

  const [payments, setPayments] =
    useState([]);

  useEffect(() => {

    fetchPayments();

  }, []);

  // ✅ FETCH PAYMENTS
  const fetchPayments = async () => {

    try {

      const res =
        await API.get("/bookings/admin/all");

      console.log(res.data);

      // ✅ FILTER PAID BOOKINGS
      const paidBookings =
        res.data.filter(
          (b) =>
            b.paymentStatus === "paid"
        );

      setPayments(
        paidBookings
      );

    } catch (err) {

      console.log(err);
    }
  };

  // ✅ TOTAL REVENUE
  const totalRevenue =
    payments.reduce(
      (acc, curr) =>
        acc + (curr.amount || 500),
      0
    );

  return (

    <div>

      {/* ✅ TITLE */}
      <h1 className="text-4xl font-bold mb-8">

        Payments

      </h1>

      {/* ✅ REVENUE CARD */}
      <div className="bg-green-100 p-6 rounded-3xl mb-8">

        <p className="text-lg text-gray-600">

          Total Revenue

        </p>

        <h1 className="text-5xl font-bold text-green-700 mt-2">

          ₹ {totalRevenue}

        </h1>

      </div>

      {/* ✅ TABLE */}
      <div className="bg-white rounded-3xl shadow overflow-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-5 text-left">
                Patient
              </th>

              <th className="p-5 text-left">
                Doctor
              </th>

              <th className="p-5 text-left">
                Date
              </th>

              <th className="p-5 text-left">
                Amount
              </th>

              <th className="p-5 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {payments.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="p-10 text-center text-gray-500"
                >

                  No payments found

                </td>

              </tr>

            ) : (

              payments.map((p) => (

                <tr
                  key={p._id}
                  className="border-b"
                >

                  <td className="p-5">
                    {p.patientName}
                  </td>

                  <td className="p-5">
                    {p.doctorName}
                  </td>

                  <td className="p-5">
                    {p.date}
                  </td>

                  <td className="p-5 font-semibold">
                    ₹ {p.amount || 500}
                  </td>

                  <td className="p-5">

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                      PAID

                    </span>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}