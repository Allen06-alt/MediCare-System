import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  // 🔥 EMAIL SUBMIT
  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }

    // 👉 future backend connect pannalam
    alert("Subscribed successfully ✅");

    setEmail("");
  };

  return (
    <footer className="bg-[#0f172a] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Medi<span className="text-blue-500">Care</span>
            </h2>

            <p className="text-gray-400 mb-8">
              Providing high-quality medical services.
            </p>

            <div className="flex gap-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white cursor-pointer"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>

            <ul className="space-y-4 text-gray-400">
              <li onClick={() => navigate("/about")} className="cursor-pointer hover:text-blue-400">▶ About Us</li>
              <li onClick={() => navigate("/doctors")} className="cursor-pointer hover:text-blue-400">▶ Our Doctors</li>
              <li onClick={() => navigate("/services")} className="cursor-pointer hover:text-blue-400">▶ Services</li>
              <li onClick={() => navigate("/contact")} className="cursor-pointer hover:text-blue-400">▶ Contact</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-white font-bold mb-6">Support</h3>

            <ul className="space-y-4 text-gray-400">
              <li className="cursor-pointer hover:text-blue-400">▶ Terms</li>
              <li className="cursor-pointer hover:text-blue-400">▶ Privacy</li>

              <li
                onClick={() => navigate("/booking")}
                className="cursor-pointer hover:text-blue-400"
              >
                ▶ Book Appointment
              </li>

              <li className="cursor-pointer hover:text-blue-400">▶ FAQ</li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-white font-bold mb-6">Newsletter</h3>

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border border-gray-700 px-4 py-3 rounded-xl text-white w-full mb-3"
            />

            <button
              onClick={handleSubscribe}
              className="bg-blue-600 text-white w-full py-3 rounded-xl font-bold"
            >
              Join Now
            </button>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-800 text-center text-gray-500 pt-6">
          © {new Date().getFullYear()} MediCare
        </div>

      </div>
    </footer>
  );
}