import {
  useEffect,
  useState,
  useContext,
} from "react";

import API from "../../api/api";

import { AuthContext }
from "../../context/AuthContext";

export default function Notifications() {

  const { user } =
    useContext(AuthContext);

  const [notifications,
    setNotifications] =
      useState([]);

  // 🔥 FETCH NOTIFICATIONS
  const fetchNotifications =
    async () => {

      try {

        const res =
          await API.get(
            `/notifications/${user.email}`
          );

        setNotifications(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  useEffect(() => {

    if (!user?.email)
      return;

    fetchNotifications();

  }, [user]);

  // 🔥 MARK AS READ
  const handleRead =
    async (id) => {

      try {

        await API.put(
          `/notifications/read/${id}`
        );

        fetchNotifications();

      } catch (err) {

        console.log(err);
      }
    };

  // 🔥 CLEAR ALL
  const handleClear =
    async () => {

      try {

        await API.delete(
          `/notifications/${user.email}`
        );

        fetchNotifications();

      } catch (err) {

        console.log(err);
      }
    };

  // 🔥 TYPE COLORS
  const getColor =
    (type) => {

      switch (type) {

        case "booking":
          return "border-blue-500";

        case "confirmed":
          return "border-green-500";

        case "cancelled":
          return "border-red-500";

        case "prescription":
          return "border-purple-500";

        default:
          return "border-gray-300";
      }
    };

  return (
    <div className="p-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Notifications 🔔
        </h1>

        {notifications.length > 0 && (
          <button
            onClick={handleClear}
            className="bg-red-600 text-white px-4 py-2 rounded-xl"
          >
            Clear All
          </button>
        )}

      </div>

      {/* 🔥 EMPTY */}
      {notifications.length === 0 ? (

        <div className="bg-white p-6 rounded-xl shadow">
          <p>
            No notifications
          </p>
        </div>

      ) : (

        <div className="space-y-4">

          {notifications.map((n) => (

            <div
              key={n._id}

              onClick={() =>
                handleRead(n._id)
              }

              className={`bg-white border-l-4 ${getColor(n.type)}
              p-5 rounded-xl shadow cursor-pointer transition hover:scale-[1.01]

              ${
                !n.read
                  ? "opacity-100"
                  : "opacity-60"
              }
              `}
            >

              {/* 🔥 TITLE */}
              <div className="flex justify-between items-center mb-2">

                <h2 className="font-bold text-lg">
                  {n.title}
                </h2>

                {!n.read && (
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                )}

              </div>

              {/* 🔥 MESSAGE */}
              <p className="text-gray-700">
                {n.message}
              </p>

              {/* 🔥 TIME */}
              <p className="text-sm text-gray-400 mt-3">

                {new Date(
                  n.createdAt
                ).toLocaleString()}

              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}