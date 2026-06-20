// pages/admin/AdminDashboard.jsx

import {
  useState,
  useEffect,
} from "react";

import API
from "../../api/api";

// 🔥 SIDEBAR
import AdminSidebar
from "../../components/admin/AdminSidebar";

// 🔥 COMPONENTS
import AdminOverview
from "../../components/admin/AdminOverview";

import AdminDoctors
from "../../components/admin/AdminDoctors";

import AdminAppointments
from "../../components/admin/AdminAppointments";

import AdminPatients
from "../../components/admin/AdminPatients";

import AdminPayments
from "../../components/admin/AdminPayments";

import AdminPrescriptions
from "../../components/admin/AdminPrescriptions";

import AdminAnalytics
from "../../components/admin/AdminAnalytics";

import AdminSettings
from "../../components/admin/AdminSettings";

export default function AdminDashboard() {

  // 🔥 ACTIVE TAB
  const [tab,
    setTab] =
      useState("overview");

  // 🔥 STATS
  const [stats,
    setStats] =
      useState({

        doctors: 0,

        patients: 0,

        appointments: 0,

        completed: 0,

        revenue: 0,
      });

  // 🔥 STATES
  const [doctors,
    setDoctors] =
      useState([]);

  const [appointments,
    setAppointments] =
      useState([]);

  const [patients,
    setPatients] =
      useState([]);

  const [prescriptions,
    setPrescriptions] =
      useState([]);

  // 🔥 FETCH DATA
  useEffect(() => {

    const fetchData =
      async () => {

        try {

          // ✅ DOCTORS
          const doctorsRes =
            await API.get(
              "/doctors"
            );

          // ✅ BOOKINGS
          const bookingsRes =
            await API.get(
              "/bookings"
            );

          // ✅ PRESCRIPTIONS
          const prescriptionRes =
            await API.get(
              "/prescriptions"
            );

          const bookings =
            bookingsRes.data || [];

          // ✅ UNIQUE PATIENTS
          const uniquePatients =
            [
              ...new Map(

                bookings.map(
                  (b) => [

                    b.userEmail,

                    b,
                  ]
                )
              ).values(),
            ];

          // ✅ COMPLETED
          const completed =
            bookings.filter(
              (b) =>
                b.status ===
                "completed"
            );

          // ✅ REVENUE
          const revenue =
            bookings
              .filter(
                (b) =>
                  b.paymentStatus ===
                  "paid"
              )
              .reduce(
                (acc, curr) =>
                  acc +
                  (curr.amount || 500),
                0
              );

          // ✅ STATS
          setStats({

            doctors:
              doctorsRes.data.length,

            patients:
              uniquePatients.length,

            appointments:
              bookings.length,

            completed:
              completed.length,

            revenue,
          });

          // ✅ SET STATES
          setDoctors(
            doctorsRes.data || []
          );

          setAppointments(
            bookings
          );

          setPatients(
            uniquePatients
          );

          setPrescriptions(
            prescriptionRes.data || []
          );

        } catch (err) {

          console.log(err);
        }
      };

    fetchData();

  }, []);

  // 🔥 RENDER TAB
  const renderTab = () => {

    switch (tab) {

      // ✅ OVERVIEW
      case "overview":

        return (

          <AdminOverview

            stats={stats}

            appointments={
              appointments
            }

            doctors={doctors}

          />
        );

      // ✅ DOCTORS
      case "doctors":

        return (

          <AdminDoctors

            doctors={doctors}

            setDoctors={setDoctors}

          />
        );

      // ✅ APPOINTMENTS
      case "appointments":

        return (

          <AdminAppointments

            appointments={
              appointments
            }

          />
        );

      // ✅ PATIENTS
      case "patients":

        return (

          <AdminPatients

            appointments={
              appointments
            }

          />
        );

      // ✅ PAYMENTS
      case "payments":

        return (

          <AdminPayments

            appointments={
              appointments
            }

          />
        );

      // ✅ PRESCRIPTIONS
      case "prescriptions":

        return (

          <AdminPrescriptions

            prescriptions={
              prescriptions
            }

          />
        );

      // ✅ ANALYTICS
      case "analytics":

        return (

          <AdminAnalytics

            appointments={
              appointments
            }

          />
        );

      // ✅ SETTINGS
      case "settings":

        return (
          <AdminSettings />
        );

      // ✅ DEFAULT
      default:

        return (

          <AdminOverview

            stats={stats}

            appointments={
              appointments
            }

            doctors={doctors}

          />
        );
    }
  };

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* 🔥 SIDEBAR */}
      <AdminSidebar

        tab={tab}

        setTab={setTab}

      />

      {/* 🔥 CONTENT */}
      <div className="flex-1 p-8 overflow-auto">

        {renderTab()}

      </div>

    </div>
  );
}