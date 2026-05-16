import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaCalendarCheck,
} from "react-icons/fa";

import heroImage
from "../../assets/hero.jpg";

export default function Hero() {

  const navigate =
    useNavigate();

  const handleBooking =
    () => {

      const user =
        localStorage.getItem(
          "user"
        );

      if (!user) {

        navigate(
          "/login",
          {
            state: {
              from:
                "booking",
            },
          }
        );

      } else {

        navigate(
          "/booking"
        );
      }
    };

  return (

    <section
      className="relative py-20 px-6 md:px-10 min-h-[85vh] flex items-center overflow-hidden"

      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')",

        backgroundSize:
          "cover",

        backgroundPosition:
          "center",
      }}
    >

      {/* 🔥 OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/60 to-transparent"></div>

      {/* 🔥 HERO BOX */}
      <motion.div

        initial={{
          opacity: 0,
          y: 50,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.8,
        }}

        className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-md rounded-[3rem] p-8 md:p-16 gap-10"
      >

        {/* 🔥 LEFT CONTENT */}
        <div className="md:w-3/5 space-y-8 text-white">

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">

            Advanced Care
            <br />

            <span className="text-blue-300">

              For Your Future

            </span>

          </h1>

          <p className="text-blue-100/80 text-lg max-w-lg leading-relaxed">

            Experience world-class healthcare with expert doctors,
            modern facilities, and seamless appointment booking.

          </p>

          {/* 🔥 BUTTONS */}
          <div className="flex gap-5 flex-wrap">

            <button
              onClick={
                handleBooking
              }

              className="bg-blue-500 hover:bg-blue-600 transition px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg"
            >

              <FaCalendarCheck />

              Book Appointment

            </button>

            <button
              onClick={() =>
                navigate(
                  "/services"
                )
              }

              className="border border-white/40 hover:bg-white hover:text-black transition px-8 py-4 rounded-2xl font-semibold"
            >

              Explore Services

            </button>

          </div>

        </div>

        {/* 🔥 RIGHT IMAGE */}
        <div className="md:w-2/5 flex justify-center">

          <img
            src={heroImage}

            alt="Doctor"

            className="w-[320px] md:w-[420px] rounded-[2rem] shadow-2xl border border-white/20 object-cover"
          />

        </div>

      </motion.div>

    </section>
  );
}