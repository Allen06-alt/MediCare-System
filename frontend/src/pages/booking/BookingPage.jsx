import {
  useState,
  useEffect,
} from "react";

import {
  useLocation,
} from "react-router-dom";

import StepPatient
from "../../components/booking/StepPatient";

import StepDetails
from "../../components/booking/StepDetails";

import StepSymptoms
from "../../components/booking/StepSymptoms";

import StepDoctor
from "../../components/booking/StepDoctor";

import StepSlot
from "../../components/booking/StepSlot";

import BookingSummary
from "../../components/booking/BookingSummary";

import useBooking
from "../../hooks/useBooking";

import {
  validateBookingStep,
} from "../../utils/validation";

import {
  getDefaultSymptom,
} from "../../utils/doctorMapping";

export default function BookingPage() {

  // 🔥 STEP
  const [step,
    setStep] =
      useState(1);

  // 🔥 BOOKING CONTEXT
  const {
    booking,
    setBooking,
  } = useBooking();

  // 🔥 LOCATION
  const location =
    useLocation();

  // 🔥 AUTO SELECT DOCTOR
  useEffect(() => {

    if (
      location.state?.doctor
    ) {

      const doc =
        location.state.doctor;

      setBooking((prev) => ({

        ...prev,

        doctor: {

          _id: doc._id,

          name: doc.name,

          specialization:
            doc.specialization,

          email: doc.email,
        },

        department:
          doc.specialization,

        symptoms:
          getDefaultSymptom(
            doc.specialization
          ),
      }));
    }

  }, []);

  // 🔥 LOADING
  if (
    location.state?.doctor &&
    !booking.doctor
  ) {

    return (

      <div className="flex items-center justify-center min-h-screen">

        <p className="text-xl font-semibold">

          Loading booking...

        </p>

      </div>
    );
  }

  // 🔥 NEXT
  const next = () => {

    const error =
      validateBookingStep(
        step,
        booking
      );

    if (error) {

      alert(error);

      return;
    }

    // ✅ FIXED FLOW
    // Step 3 -> Step 4 ALWAYS
    setStep((prev) =>
      prev + 1
    );
  };

  // 🔥 PREVIOUS
  const prev = () => {

    setStep((prev) =>
      prev - 1
    );
  };

  return (

    <div className="p-6 bg-gray-50 min-h-screen">

      {/* 🔥 TITLE */}
      <h1 className="text-4xl text-center font-bold mb-8">

        Book Appointment{" "}

        {booking?.doctor
          ? `with ${booking.doctor.name}`
          : ""}

      </h1>

      {/* 🔥 CARD */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">

        {/* 🔥 STEP COMPONENTS */}

        {step === 1 && (

          <StepPatient />

        )}

        {step === 2 && (

          <StepDetails />

        )}

        {step === 3 && (

          <StepSymptoms />

        )}

        {/* ✅ FIXED */}
        {step === 4 && (

          <StepDoctor />

        )}

        {step === 5 && (

          <StepSlot />

        )}

        {step === 6 && (

          <BookingSummary />

        )}

        {/* 🔥 BUTTONS */}
        <div className="flex justify-between mt-8">

          {/* BACK */}
          {step > 1 ? (

            <button
              onClick={prev}
              className="px-6 py-3 border rounded-xl hover:bg-gray-100"
            >

              Back

            </button>

          ) : (

            <div />
          )}

          {/* NEXT */}
          {step < 6 && (

            <button
              onClick={next}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >

              Next

            </button>
          )}

        </div>

      </div>

    </div>
  );
}