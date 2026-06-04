import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa6";
import { useState } from "react";

export default function ContactCTA() {
  const [email, setEmail] = useState("");

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
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/85"></div>

      <div className="relative max-w-4xl mx-auto px-6 text-center text-white">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay Updated With Medicare
          </h2>

          <p className="text-blue-100 text-lg mb-10">
            Get healthcare tips, medical updates,
            and important announcements directly
            to your inbox.
          </p>
        </motion.div>

        {/* Subscribe Form */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 rounded-xl text-black outline-none"
          />

          <button
            onClick={handleSubscribe}
            className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
          >
            <FaPaperPlane />
            Subscribe
          </button>
        </motion.div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-14">

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="font-bold text-xl mb-2">
              📞 Emergency
            </h3>
            <p className="text-blue-100">
              24/7 Medical Support
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="font-bold text-xl mb-2">
              🏥 Healthcare
            </h3>
            <p className="text-blue-100">
              Trusted Doctors & Care
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="font-bold text-xl mb-2">
              🔒 Secure Records
            </h3>
            <p className="text-blue-100">
              Safe Patient Information
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}