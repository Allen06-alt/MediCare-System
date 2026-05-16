// components/doctor/DoctorStats.jsx

import {
  FaUserMd,
  FaClock,
} from "react-icons/fa";

import {
  FaCircleCheck,
  FaXmark,
} from "react-icons/fa6";

export default function DoctorStats({

  total = 0,

  pending = 0,

  completed = 0,

  cancelled = 0,

}) {

  const stats = [

    {
      title: "Total",
      value: total,
      icon: <FaUserMd />,
      color: "text-blue-500",
    },

    {
      title: "Pending",
      value: pending,
      icon: <FaClock />,
      color: "text-yellow-500",
    },

    {
      title: "Completed",
      value: completed,
      icon: <FaCircleCheck />,
      color: "text-green-500",
    },

    {
      title: "Cancelled",
      value: cancelled,
      icon: <FaXmark />,
      color: "text-red-500",
    },
  ];

  return (

    <div className="grid md:grid-cols-4 gap-6">

      {stats.map((s, index) => (

        <div
          key={index}
          className="bg-white p-6 rounded-3xl shadow"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                {s.title}

              </p>

              <h2 className="text-4xl font-bold mt-2">

                {s.value}

              </h2>

            </div>

            <div className={`text-4xl ${s.color}`}>

              {s.icon}

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}