import {
  useState,
  useEffect,
  useContext,
} from "react";

import {
  AuthContext,
} from "../../context/AuthContext";

import API from "../../api/api";

// 🔥 COMPONENTS
import Sidebar from "../../components/dashboard/Sidebar";
import Overview from "../../components/dashboard/Overview";
import AppointmentList from "../../components/dashboard/AppointmentList";
import Family from "../../components/dashboard/Family";
import Records from "../../components/dashboard/Records";
import Settings from "../../components/dashboard/Settings";
import PrescriptionCard from "../../components/dashboard/PrescriptionCard";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  // 🔥 STATES
  const [tab, setTab] = useState("overview");
  const [appointments, setAppointments] = useState([]);
  const [family, setFamily] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  // 🔥 FETCH BOOKINGS
  const fetchAppointments = () => {
    if (!user?.email) return;

    API.get(`/api/bookings/${user.email}`)
      .then((res) => {
        console.log("Appointments:", res.data);

        setAppointments(
          Array.isArray(res.data)
            ? res.data
            : [res.data]
        );
      })
      .catch((err) => {
        console.log("Appointments Error:", err);
      });
  };

  // 🔥 FETCH FAMILY
  const fetchFamily = () => {
    if (!user?.email) return;

    API.get(`/api/family/${user.email}`)
      .then((res) => {
        setFamily(res.data);
      })
      .catch((err) => {
        console.log("Family Error:", err);
      });
  };

  // 🔥 FETCH PRESCRIPTIONS
  const fetchPrescriptions = () => {
    if (!user?.email) return;

    API.get("/api/prescriptions")
      .then((res) => {
        const filtered = res.data.filter(
          (p) => p.patientEmail === user.email
        );

        setPrescriptions(filtered);
      })
      .catch((err) => {
        console.log("Prescription Error:", err);
      });
  };

  // 🔥 LOAD DATA
  useEffect(() => {
    fetchAppointments();
    fetchFamily();
    fetchPrescriptions();
  }, [user]);

  // 🔥 TAB RENDER
  const renderTab = () => {
    switch (tab) {
      case "appointments":
        return (
          <AppointmentList
            appointments={appointments}
            family={family}
            refresh={fetchAppointments}
          />
        );

      case "family":
        return <Family />;

      case "records":
        return (
          <Records
            appointments={appointments}
          />
        );

      case "settings":
        return <Settings />;

      case "prescriptions":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">
              Prescriptions 💊
            </h1>

            {prescriptions.length === 0 ? (
              <p className="text-gray-500">
                No prescriptions found
              </p>
            ) : (
              <div className="space-y-5">
                {prescriptions.map((p) => (
                  <PrescriptionCard
                    key={p._id}
                    prescription={p}
                  />
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <Overview
            user={user}
            appointments={appointments}
          />
        );
    }
  };

  return (
    <div className="flex">
      {/* 🔥 SIDEBAR */}
      <Sidebar
        tab={tab}
        setTab={setTab}
      />

      {/* 🔥 CONTENT */}
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        {renderTab()}
      </div>
    </div>
  );
}