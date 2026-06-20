import {
  FaUser,
  FaCalendar,
  FaUsers,
  FaFile,
  FaCog,
  FaBell,
  FaFileMedical,
} from "react-icons/fa";

import {
  useEffect,
  useState,
  useContext,
} from "react";

import API from "../../api/api";

import {
  AuthContext,
} from "../../context/AuthContext";

export default function Sidebar({
  tab,
  setTab,
}) {

  const { user } =
    useContext(AuthContext);

  // 🔥 NOTIFICATION COUNT
  const [unread,
    setUnread] =
      useState(0);

  // 🔥 FETCH PENDING APPOINTMENTS
  const fetchNotifications =
    async () => {

      try {

        if (!user?.email)
          return;

        // ✅ GET USER BOOKINGS
        const res =
          await API.get(
            `/bookings/${user.email}`
          );

        // ✅ ONLY PENDING
        const pendingAppointments =
          res.data.filter(
            (a) =>
              a.status ===
              "pending"
          );

        // ✅ SET COUNT
        setUnread(
          pendingAppointments.length
        );

      } catch (err) {

        console.log(err);
      }
    };

  // 🔥 AUTO REFRESH
  useEffect(() => {

    fetchNotifications();

    const interval =
      setInterval(() => {

        fetchNotifications();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, [user]);

  // 🔥 MENU
  const menu = [

    {
      key: "overview",
      label: "Overview",
      icon: <FaUser />,
    },

    {
      key: "appointments",
      label: "My Appointments",
      icon: <FaCalendar />,
    },

    {
      key: "notifications",
      label: "Notifications",
      icon: <FaBell />,
    },

    {
      key: "family",
      label: "Family",
      icon: <FaUsers />,
    },

    {
      key: "records",
      label: "Records",
      icon: <FaFile />,
    },

    {
      key: "prescriptions",
      label: "Prescriptions",
      icon: <FaFileMedical />,
    },

    {
      key: "settings",
      label: "Settings",
      icon: <FaCog />,
    },
  ];

  return (

    <div className="w-64 bg-white shadow h-screen p-4">

      {/* 🔥 TITLE */}
      <h2 className="text-2xl font-bold mb-6">
        Dashboard
      </h2>

      {/* 🔥 MENU */}
      {menu.map((item) => (

        <div
          key={item.key}

          onClick={() =>
            setTab(item.key)
          }

          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer mb-3 transition

          ${
            tab === item.key
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-100"
          }
          `}
        >

          {/* 🔥 LEFT */}
          <div className="flex items-center gap-3">

            <span className="text-lg">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.label}
            </span>

          </div>

          {/* 🔥 BADGE */}
          {item.key ===
            "notifications" &&
            unread > 0 && (

            <div className="bg-red-500 text-white text-xs font-bold min-w-[22px] h-[22px] flex items-center justify-center rounded-full px-1 animate-pulse">

              {unread}

            </div>
          )}

        </div>
      ))}

    </div>
  );
}