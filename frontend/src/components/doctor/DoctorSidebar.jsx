// components/doctor/DoctorSidebar.jsx

import {
  FaHome,
  FaCalendarCheck,
  FaUserInjured,
  FaFilePrescription,
  FaCog,
} from "react-icons/fa";

import {
  MdSchedule,
} from "react-icons/md";

export default function DoctorSidebar({

  tab,

  setTab,

}) {

  // 🔥 MENUS
  const menus = [

    {
      key: "overview",
      label: "Overview",
      icon: <FaHome />,
    },

    {
      key: "appointments",
      label: "Appointments",
      icon: <FaCalendarCheck />,
    },

    {
      key: "patients",
      label: "Patients",
      icon: <FaUserInjured />,
    },

    {
      key: "prescriptions",
      label: "Prescriptions",
      icon: <FaFilePrescription />,
    },

    {
      key: "schedule",
      label: "Schedule",
      icon: <MdSchedule />,
    },

    {
      key: "settings",
      label: "Settings",
      icon: <FaCog />,
    },
  ];

  return (

    <div className="w-72 min-h-screen bg-white shadow-xl border-r p-6 sticky top-0">

      {/* 🔥 HEADER */}
      <div className="mb-12">

        <h1 className="text-3xl font-extrabold text-blue-600">

          Doctor Panel

        </h1>

        <p className="text-gray-500 mt-2">

          Manage your workflow

        </p>

      </div>

      {/* 🔥 MENUS */}
      <div className="space-y-3">

        {menus.map((item) => (

          <button
            key={item.key}

            onClick={() =>
              setTab(item.key)
            }

            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold transition-all duration-200

              ${
                tab === item.key

                  ? "bg-blue-600 text-white shadow-lg scale-[1.02]"

                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >

            {/* 🔥 ICON */}
            <span className="text-xl">

              {item.icon}

            </span>

            {/* 🔥 LABEL */}
            <span>

              {item.label}

            </span>

          </button>
        ))}

      </div>

    </div>
  );
}