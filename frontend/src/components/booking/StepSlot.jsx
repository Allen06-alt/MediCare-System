import {
  useContext,
  useEffect,
  useState,
} from "react";

import { BookingContext }
from "../../context/BookingContext";

import API from "../../api/api";

export default function StepSlot() {

  const {
    booking,
    setBooking,
  } = useContext(BookingContext);

  // 🔥 ALL SLOTS
  const slots = [
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
  ];

  // 🔥 BOOKED SLOTS
  const [bookedSlots, setBookedSlots] =
    useState([]);

  // 🔥 FETCH BOOKED SLOTS
  useEffect(() => {

    // ❌ NO DOCTOR
    if (!booking?.doctor?.email) return;

    // ❌ NO DATE
    if (!booking?.date) return;

    API.get(
      `/bookings/slots/${booking.doctor.email}/${booking.date}`
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
    booking?.doctor?.email,
    booking?.date,
  ]);

  // 🔥 DATE CHANGE
  const handleDateChange = (e) => {

    setBooking({
      ...booking,

      date: e.target.value,

      // 🔥 RESET SLOT
      slot: "",
    });
  };

  // 🔥 SLOT SELECT
  const handleSelectSlot = (slot) => {

    setBooking({
      ...booking,
      slot,
    });
  };

  // 🔥 CONVERT SLOT TO MINUTES
  const convertSlotToMinutes = (slot) => {

    const [time, modifier] =
      slot.split(" ");

    let [hours, minutes] =
      time.split(":").map(Number);

    // 🔥 PM
    if (
      modifier === "PM" &&
      hours !== 12
    ) {
      hours += 12;
    }

    // 🔥 AM 12 FIX
    if (
      modifier === "AM" &&
      hours === 12
    ) {
      hours = 0;
    }

    return (hours * 60) + minutes;
  };

  // 🔥 TODAY CHECK
  const isToday = (date) => {

    if (!date) return false;

    const today = new Date();

    const yyyy =
      today.getFullYear();

    const mm =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");

    const dd =
      String(
        today.getDate()
      ).padStart(2, "0");

    const todayString =
      `${yyyy}-${mm}-${dd}`;

    return date === todayString;
  };

  // 🔥 CURRENT TIME
  const getCurrentMinutes = () => {

    const now = new Date();

    return (
      now.getHours() * 60 +
      now.getMinutes()
    );
  };

  return (
    <div>

      <h2 className="text-xl font-bold mb-6">
        Select Date & Slot
      </h2>

      {/* 🔥 DATE PICKER */}
      <div className="mb-6">

        <label className="block mb-2 font-semibold">
          Select Date
        </label>

        <input
          type="date"
          value={booking.date || ""}
          onChange={handleDateChange}
          min={
            new Date()
              .toISOString()
              .split("T")[0]
          }
          className="border p-3 rounded w-full"
        />

      </div>

      {/* 🔥 SLOT SECTION */}
      {booking.date && (
        <>
          <h3 className="font-bold mb-4">
            Available Slots
          </h3>

          <div className="grid grid-cols-2 gap-4">

            {slots.map((slot) => {

              // 🔥 ALREADY BOOKED
              const isBooked =
                bookedSlots.includes(slot);

              // 🔥 REALTIME PAST SLOT CHECK
              const slotMinutes =
                convertSlotToMinutes(slot);

              const currentMinutes =
                getCurrentMinutes();

              const isPastSlot =
                isToday(booking.date) &&
                slotMinutes <= currentMinutes;

              // 🔥 FINAL DISABLE
              const isDisabled =
                isBooked || isPastSlot;

              return (
                <button
                  key={slot}

                  disabled={isDisabled}

                  onClick={() =>
                    handleSelectSlot(slot)
                  }

                  className={`p-3 border rounded transition font-semibold

                    ${
                      booking.slot === slot
                        ? "bg-blue-600 text-white"
                        : ""
                    }

                    ${
                      isDisabled
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "hover:bg-blue-50"
                    }
                  `}
                >

                  {slot}

                  {/* 🔥 LABELS */}
                  {isBooked && " ❌"}

                  {!isBooked &&
                    isPastSlot &&
                    " ⏰"}

                </button>
              );
            })}

          </div>

          {/* 🔥 SELECTED */}
          {booking.slot && (
            <p className="mt-6 text-green-600 font-bold">

              Selected:

              {" "}

              {booking.date}

              {" - "}

              {booking.slot}

            </p>
          )}
        </>
      )}

    </div>
  );
}