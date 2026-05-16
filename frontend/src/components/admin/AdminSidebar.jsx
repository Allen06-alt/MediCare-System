// components/admin/AdminSidebar.jsx

import {
  FaUser,
  FaCalendar,
  FaUsers,
  FaCog,
  FaMoneyBill,
  FaFileMedical,
  FaChartBar,
} from "react-icons/fa";

export default function AdminSidebar({
  tab,
  setTab,
}) {

  const menu = [

    {
      key: "overview",
      label: "Overview",
      icon: <FaUser />,
    },

    {
      key: "appointments",
      label: "Appointments",
      icon: <FaCalendar />,
    },

    {
      key: "doctors",
      label: "Doctors",
      icon: <FaUser />,
    },

    {
      key: "patients",
      label: "Patients",
      icon: <FaUsers />,
    },

    {
      key: "payments",
      label: "Payments",
      icon: <FaMoneyBill />,
    },

    {
      key: "prescriptions",
      label: "Prescriptions",
      icon: <FaFileMedical />,
    },

    {
      key: "analytics",
      label: "Analytics",
      icon: <FaChartBar />,
    },

    {
      key: "settings",
      label: "Settings",
      icon: <FaCog />,
    },
  ];

  return (

    <div className="w-64 bg-white shadow h-screen p-5">

      <h2 className="text-3xl font-bold mb-8">
        Admin
      </h2>

      {menu.map((item) => (

        <div
          key={item.key}

          onClick={() =>
            setTab(item.key)
          }

          className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer mb-3 transition

          ${
            tab === item.key
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-100"
          }
          `}
        >

          <span className="text-lg">
            {item.icon}
          </span>

          <span className="font-semibold">
            {item.label}
          </span>

        </div>
      ))}

    </div>
  );
}