import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  FaRegClock,
} from "react-icons/fa";

import API from "../../api/api";

export default function Availability({
  doctor,
}) {

  // 🔥 DATE
  const [selectedDate, setSelectedDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  // 🔥 BOOKED SLOTS
  const [bookedSlots, setBookedSlots] =
    useState([]);

  // 🔥 ALL SLOTS
  const timeSlots = [
    {
      time: "10:00 AM",
      period: "Morning",
    },
    {
      time: "11:30 AM",
      period: "Morning",
    },
    {
      time: "02:00 PM",
      period: "Afternoon",
    },
    {
      time: "03:30 PM",
      period: "Afternoon",
    },
    {
      time: "05:00 PM",
      period: "Evening",
    },
    {
      time: "06:30 PM",
      period: "Evening",
    },
  ];

  // 🔥 FETCH BOOKED SLOTS
  useEffect(() => {

    if (!doctor?.email) return;

    API.get(
      `"/api/bookings/slots/${doctor.email}/${selectedDate}`
    )
      .then((res) => {

        console.log(
          "BOOKED SLOTS 👉",
          res.data
        );

        setBookedSlots(res.data);

      })
      .catch((err) => {
        console.log(err);
      });

  }, [
    doctor?.email,
    selectedDate,
  ]);

  // 🔥 CONVERT SLOT TO MINUTES
  const convertSlotToMinutes =
    (slot) => {

      const [time, modifier] =
        slot.split(" ");

      let [hours, minutes] =
        time
          .split(":")
          .map(Number);

      // PM FIX
      if (
        modifier === "PM" &&
        hours !== 12
      ) {
        hours += 12;
      }

      // 12 AM FIX
      if (
        modifier === "AM" &&
        hours === 12
      ) {
        hours = 0;
      }

      return (
        hours * 60 + minutes
      );
    };

  // 🔥 TODAY CHECK
  const isToday = (date) => {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    return date === today;
  };

  // 🔥 CURRENT TIME
  const getCurrentMinutes =
    () => {

      const now = new Date();

      return (
        now.getHours() * 60 +
        now.getMinutes()
      );
    };

  return (
    <div className="mt-10">

      {/* 🔥 SECTION HEADER */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
            <FaRegClock size={20} />
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Available Slots
          </h2>

        </div>

        {/* 🔥 DATE PICKER */}
        <input
          type="date"
          value={selectedDate}
          min={
            new Date()
              .toISOString()
              .split("T")[0]
          }
          onChange={(e) =>
            setSelectedDate(
              e.target.value
            )
          }
          className="border border-gray-300 rounded-xl px-4 py-2"
        />

      </div>

      {/* 🔥 SLOTS GRID */}
      <div className="space-y-8">

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

          {timeSlots.map(
            (slot, index) => {

              // 🔥 BOOKED CHECK
              const isBooked =
                bookedSlots.includes(
                  slot.time
                );

              // 🔥 PAST SLOT CHECK
              const slotMinutes =
                convertSlotToMinutes(
                  slot.time
                );

              const currentMinutes =
                getCurrentMinutes();

              const isPastSlot =
                isToday(
                  selectedDate
                ) &&
                slotMinutes <=
                  currentMinutes;

              // 🔥 FINAL DISABLE
              const isDisabled =
                isBooked ||
                isPastSlot;

              return (
                <motion.button
                  key={index}

                  disabled={
                    isDisabled
                  }

                  whileHover={
                    !isDisabled
                      ? {
                          scale: 1.05,
                          y: -2,
                        }
                      : {}
                  }

                  whileTap={
                    !isDisabled
                      ? {
                          scale: 0.95,
                        }
                      : {}
                  }

                  className={`relative group px-6 py-4 rounded-2xl 
                  transition-all duration-300 text-center border

                  ${
                    isDisabled
                      ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
                      : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100"
                  }
                `}
                >

                  {/* 🔥 PERIOD */}
                  <div className="flex flex-col items-center gap-1">

                    <span className={`text-xs font-bold uppercase tracking-widest

                      ${
                        isDisabled
                          ? "text-gray-400"
                          : "text-gray-400 group-hover:text-blue-500"
                      }
                    `}>
                      {slot.period}
                    </span>

                    <span className={`text-lg font-extrabold

                      ${
                        isDisabled
                          ? "text-gray-400"
                          : "text-gray-800 group-hover:text-blue-600"
                      }
                    `}>
                      {slot.time}
                    </span>

                    {/* 🔥 STATUS */}
                    {isBooked && (
                      <span className="text-xs text-red-500 font-bold mt-1">
                        BOOKED
                      </span>
                    )}

                    {!isBooked &&
                      isPastSlot && (
                        <span className="text-xs text-orange-500 font-bold mt-1">
                          CLOSED
                        </span>
                      )}

                  </div>

                  {/* 🔥 GLOW */}
                  {!isDisabled && (
                    <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 rounded-2xl -z-10 transition-opacity"></div>
                  )}

                </motion.button>
              );
            }
          )}

        </div>

        {/* 🔥 INFO NOTE */}
        <p className="flex items-center gap-2 text-sm text-gray-400 bg-gray-50 w-fit px-4 py-2 rounded-xl">

          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>

          Slots update in realtime based on bookings & current time

        </p>

      </div>

    </div>
  );
}