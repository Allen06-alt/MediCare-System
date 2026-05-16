import { useNavigate } from "react-router-dom";
import ServicesHeader from "./ServicesHeader";
import ServicesColumn from "./ServicesColumn";
import ServicesImage from "./ServicesImage";

export default function ServicesLayout() {
  const navigate = useNavigate();

  const leftServices = [
    {
      title: "Echocardiograms",
      desc: "View heart activity and structure clearly",
      iconType: "heart",
    },
    {
      title: "Pediatric Services",
      desc: "Complete child healthcare support",
      iconType: "checkup",
    },
    {
      title: "Women's Healthcare",
      desc: "Advanced women's health services",
      iconType: "checkup",
    },
  ];

  const rightServices = [
    {
      title: "Dermatology",
      desc: "Skin treatments and care",
      iconType: "checkup",
    },
    {
      title: "Laboratory Testing",
      desc: "Accurate lab results",
      iconType: "lab",
    },
    {
      title: "CT Scans",
      desc: "Advanced imaging services",
      iconType: "emergency",
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#fcfdfe] overflow-hidden">

      {/* 🔥 HEADER */}
      <ServicesHeader />

      {/* 🔥 EXPLORE BUTTON */}
      <div className="text-center mb-16">
        <button
          onClick={() => navigate("/services")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg active:scale-95"
        >
          Explore All Services
        </button>
      </div>

      {/* 🔥 MAIN GRID */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 items-center gap-12 lg:gap-20 px-8">

        {/* LEFT */}
        <ServicesColumn data={leftServices} align="right" />

        {/* CENTER IMAGE */}
        <div className="relative order-first md:order-none mb-12 md:mb-0">
          <div className="absolute inset-0 bg-blue-200/30 rounded-full blur-[120px] -z-10"></div>
          <ServicesImage />
        </div>

        {/* RIGHT */}
        <ServicesColumn data={rightServices} align="left" />

      </div>

    </section>
  );
}