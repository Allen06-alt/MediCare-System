import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactCTA() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      alert("Enter valid email ❌");
      return;
    }

    alert("Subscribed successfully ✅");
    setEmail("");
  };

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581594693702-fbdc51b2763b')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-blue-900/80"></div>

      <div className="relative text-center text-white max-w-3xl mx-auto">

        <h2 className="text-4xl font-bold mb-4">
          Get Medical Updates
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="px-6 py-4 rounded-xl text-black w-full"
          />

          <button
            onClick={handleSubscribe}
            className="bg-blue-500 px-6 py-4 rounded-xl"
          >
            Subscribe
          </button>

        </div>

        {/* 🔥 EXTRA CTA */}
        <button
          onClick={() => navigate("/booking")}
          className="mt-6 underline"
        >
          Book Appointment →
        </button>

      </div>
    </section>
  );
}