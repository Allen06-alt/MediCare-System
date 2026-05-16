import {
  useEffect,
  useState,
} from "react";

import useBooking
from "../../hooks/useBooking";

import {
  suggestDoctors,
} from "../../utils/doctorMapping";

import API
from "../../api/api";

export default function StepDoctor() {

  const {
    booking,
    setBooking,
  } = useBooking();

  // 🔥 STATES
  const [doctors,
    setDoctors] =
      useState([]);

  // 🔥 FETCH DOCTORS
  useEffect(() => {

    API.get("/doctors")
      .then((res) => {

        setDoctors(
          res.data || []
        );

      })
      .catch((err) => {

        console.log(err);
      });

  }, []);

  // 🔥 SUGGESTED DOCTORS
  const suggested =
    suggestDoctors(

      doctors,

      booking?.department
    );

  // 🔥 AUTO SELECT DOCTOR
  useEffect(() => {

    // ✅ NO DOCTOR
    if (
      suggested.length === 0
    ) {

      setBooking((prev) => ({

        ...prev,

        doctor: null,
      }));

      return;
    }

    // ✅ FIRST MATCH
    const firstDoctor =
      suggested[0];

    // ✅ AUTO UPDATE
    setBooking((prev) => ({

      ...prev,

      doctor: {

        _id:
          firstDoctor._id,

        name:
          firstDoctor.name,

        specialization:
          firstDoctor.specialization,

        email:
          firstDoctor.email,
      },
    }));

  }, [booking?.department]);

  // 🔥 MANUAL SELECT
  const handleSelectDoctor =
    (doc) => {

      setBooking((prev) => ({

        ...prev,

        doctor: {

          _id: doc._id,

          name: doc.name,

          specialization:
            doc.specialization,

          email: doc.email,
        },
      }));
    };

  // ✅ HIDE ENTIRE STEP
  if (
    !booking?.department
  ) {

    return null;
  }

  return (

    <div>

      {/* 🔥 TITLE */}
      <h2 className="text-2xl font-bold mb-6">

        Select Doctor 👨‍⚕️

      </h2>

      {/* 🔥 NO DOCTOR */}
      {suggested.length === 0 ? (

        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">

          No doctors available

        </div>

      ) : (

        <div className="space-y-4">

          {suggested.map((doc) => (

            <div
              key={doc._id}

              onClick={() =>
                handleSelectDoctor(
                  doc
                )
              }

              className={`p-5 border rounded-2xl cursor-pointer transition shadow-sm

              ${
                booking
                  ?.doctor?._id ===
                doc._id

                  ? "bg-blue-100 border-blue-600"

                  : "hover:bg-gray-50"
              }
              `}
            >

              {/* 🔥 NAME */}
              <h3 className="text-lg font-bold">

                {doc.name}

              </h3>

              {/* 🔥 SPECIALIZATION */}
              <p className="text-blue-600 mt-1">

                {
                  doc.specialization
                }

              </p>

              {/* 🔥 EMAIL */}
              <p className="text-gray-400 text-sm mt-1">

                {doc.email}

              </p>

              {/* 🔥 SELECTED */}
              {booking
                ?.doctor?._id ===
                doc._id && (

                <p className="mt-3 text-green-600 font-semibold">

                  Selected ✅

                </p>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}