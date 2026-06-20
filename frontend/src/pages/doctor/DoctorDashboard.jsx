// pages/doctor/DoctorDashboard.jsx

import {
  useEffect,
  useState,
  useContext,
} from "react";

import API from "../../api/api";

import {
  AuthContext,
} from "../../context/AuthContext";

// 🔥 COMPONENTS
import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import DoctorOverview from "../../components/doctor/DoctorOverview";
import DoctorAppointments from "../../components/doctor/DoctorAppointments";
import DoctorPatients from "../../components/doctor/DoctorPatients";
import DoctorPrescriptions from "../../components/doctor/DoctorPrescriptions";
import DoctorSchedule from "../../components/doctor/DoctorSchedule";
import DoctorSettings from "../../components/doctor/DoctorSettings";

export default function DoctorDashboard() {

  const [tab, setTab] = useState("overview");

  const [appointments, setAppointments] = useState([]);

  const { user } = useContext(AuthContext);

  // 🔥 FETCH APPOINTMENTS
  const fetchAppointments = async () => {
    try {

      const res = await API.get(
        `/api/bookings/doctor/${user?.email}`
      );

      setAppointments(
        res.data || []
      );

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 LOAD
  useEffect(() => {

    if (user?.email) {
      fetchAppointments();
    }

  }, [user]);

  // 🔥 RENDER CONTENT
  const renderContent = () => {

    switch (tab) {

      case "overview":
        return (
          <DoctorOverview
            appointments={appointments}
          />
        );

      case "appointments":
        return (
          <DoctorAppointments
            appointments={appointments}
          />
        );

      case "patients":
        return (
          <DoctorPatients
            appointments={appointments}
          />
        );

      case "prescriptions":
        return (
          <DoctorPrescriptions
            appointments={appointments}
          />
        );

      case "schedule":
        return (
          <DoctorSchedule
            appointments={appointments}
          />
        );

      case "settings":
        return <DoctorSettings />;

      default:
        return (
          <DoctorOverview
            appointments={appointments}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 SIDEBAR */}
      <DoctorSidebar
        tab={tab}
        setTab={setTab}
      />

      {/* 🔥 MAIN */}
      <div className="flex-1 p-8 overflow-auto">

        {/* 🔥 TOP CARD */}
        <div className="bg-white rounded-3xl shadow p-8 mb-8 flex justify-between items-center flex-wrap gap-5">

          <div>
            <h1 className="text-4xl font-bold">
              Welcome Dr. {user?.name}
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Manage appointments,
              prescriptions and patients
            </p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-6 py-4 rounded-2xl font-bold text-lg">
            {appointments.length} Total Appointments
          </div>

        </div>

        {renderContent()}

      </div>

    </div>
  );
}