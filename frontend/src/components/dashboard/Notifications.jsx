import { motion } from "framer-motion";

import {
  FaFileSignature,
  FaCircleCheck,
  FaClock,
  FaDownload,
} from "react-icons/fa6";

import {
  useEffect,
  useState,
  useContext,
} from "react";

import API
from "../../api/api";

import {
  AuthContext,
} from "../../context/AuthContext";

export default function Notifications() {

  // 🔥 USER
  const { user } =
    useContext(
      AuthContext
    );

  // 🔥 STATES
  const [appointments,
    setAppointments] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  // 🔥 FETCH APPOINTMENTS
  useEffect(() => {

    if (!user?.email)
      return;

    API.get(
      `/bookings/${user.email}`
    )
      .then((res) => {

        setAppointments(
          res.data || []
        );

        setLoading(false);

      })
      .catch((err) => {

        console.log(err);

        setLoading(false);
      });

  }, [user]);

  // 🔥 SORT LATEST FIRST
  const sorted =
    [...appointments].reverse();

  // 🔥 FORMAT STATUS
  const getStatus =
    (date) => {

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      if (date === today) {

        return {

          text: "Today",

          type: "update",
        };
      }

      if (
        new Date(date) >
        new Date()
      ) {

        return {

          text: "Upcoming",

          type: "info",
        };
      }

      return {

        text: "Completed",

        type: "success",
      };
    };

  // 🔥 DOWNLOAD ALL
  const handleDownload =
    () => {

      alert(
        "Download feature coming soon ✅"
      );
    };

  return (

    <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col h-full overflow-hidden">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-8 px-1">

        <div>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-2">

            Recent Notes

          </h2>

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] italic">

            Medical Updates

          </p>

        </div>

        {/* 🔥 DOWNLOAD */}
        <motion.button

          whileHover={{
            scale: 1.05,
          }}

          whileTap={{
            scale: 0.95,
          }}

          onClick={
            handleDownload
          }

          className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
        >

          <FaDownload />

          Download

        </motion.button>

      </div>

      {/* 🔥 LOADING */}
      {loading ? (

        <div className="flex justify-center items-center py-20">

          <p className="text-gray-400 font-semibold">

            Loading...

          </p>

        </div>

      ) : (

        <div className="space-y-4 flex-1">

          {/* 🔥 EMPTY */}
          {sorted.length === 0 ? (

            <div className="py-10 text-center border-2 border-dashed border-gray-50 rounded-[2rem] bg-gray-50/30">

              <p className="text-gray-300 font-bold uppercase tracking-widest text-[9px]">

                No recent updates

              </p>

            </div>

          ) : (

            sorted.map(
              (
                appt,
                i
              ) => {

                const status =
                  getStatus(
                    appt.date
                  );

                return (

                  <motion.div
                    key={
                      appt._id || i
                    }

                    initial={{
                      opacity: 0,
                      x: 20,
                    }}

                    animate={{
                      opacity: 1,
                      x: 0,
                    }}

                    transition={{
                      delay:
                        i * 0.1,
                    }}

                    whileHover={{
                      x: 5,
                    }}

                    className="flex gap-4 bg-gray-50/50 p-5 rounded-[1.5rem] border border-transparent hover:border-blue-50 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all group"
                  >

                    {/* 🔥 ICON */}
                    <div
                      className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm

                      ${
                        status.type ===
                        "success"

                          ? "bg-green-100 text-green-500"

                          : status.type ===
                            "update"

                          ? "bg-blue-100 text-blue-500"

                          : "bg-amber-100 text-amber-500"
                      }
                      `}
                    >

                      {status.type ===
                      "success" ? (

                        <FaCircleCheck />

                      ) : status.type ===
                        "update" ? (

                        <FaFileSignature />

                      ) : (

                        <FaClock />
                      )}

                    </div>

                    {/* 🔥 CONTENT */}
                    <div className="flex-1">

                      <p className="text-sm font-black text-gray-800 leading-tight mb-1 group-hover:text-blue-600 transition-colors">

                        Appointment with{" "}

                        {appt
                          ?.doctor
                          ?.name ||

                          appt.doctorName ||

                          "Doctor"}

                      </p>

                      <div className="flex items-center gap-2 flex-wrap">

                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">

                          {appt.date}

                        </span>

                        <span className="w-1 h-1 bg-gray-300 rounded-full" />

                        <span
                          className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md

                          ${
                            status.type ===
                            "success"

                              ? "bg-green-50 text-green-600"

                              : status.type ===
                                "update"

                              ? "bg-blue-50 text-blue-600"

                              : "bg-amber-50 text-amber-600"
                          }
                          `}
                        >

                          {status.text}

                        </span>

                      </div>

                      {/* 🔥 EXTRA INFO */}
                      <div className="mt-3 text-sm text-gray-500 space-y-1">

                        <p>

                          Department:{" "}

                          {
                            appt.department
                          }

                        </p>

                        <p>

                          Slot:{" "}

                          {appt.slot}

                        </p>

                      </div>

                    </div>

                  </motion.div>
                );
              }
            )
          )}

        </div>
      )}

      {/* 🔥 FOOTER */}
      <div className="mt-8 pt-6 border-t border-gray-50">

        <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] text-center italic">

          MedCare Digital Monitoring

        </p>

      </div>

    </div>
  );
}