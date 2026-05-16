import {
  BrowserRouter,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import AppRoutes from "./routes/AppRoutes";

function Layout() {

  const location =
    useLocation();

  // 🔥 HIDE FOOTER ROUTES
  const hideFooter =
    ["/login", "/signup"].includes(
      location.pathname
    ) ||

    // 🔥 PATIENT
    location.pathname.startsWith(
      "/dashboard"
    ) ||

    location.pathname.startsWith(
      "/booking"
    ) ||

    // 🔥 DOCTOR
    location.pathname.startsWith(
      "/doctor"
    ) ||

    // 🔥 ADMIN
    location.pathname.startsWith(
      "/admin"
    );

  return (
    <div className="flex flex-col min-h-screen">

      {/* 🌐 NAVBAR */}
      <Navbar />

      {/* 📄 ROUTES */}
      <div className="flex-grow">

        <AppRoutes />

      </div>

      {/* 📌 FOOTER */}
      {!hideFooter && <Footer />}

    </div>
  );
}

export default function App() {

  return (
    <BrowserRouter>

      <Layout />

    </BrowserRouter>
  );
}