import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../api/api";
import AuthLayout from "../../components/layout/AuthLayout";
import { AuthContext } from "../../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 AUTO REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be 6+ characters");
      return;
    }

    try {
      await API.post("/auth/register", form);

      alert("Signup successful ✅");

      navigate("/login", {
        state: location.state,
      });

    } catch (err) {
      setError(err.response?.data || "Signup failed ❌");
    }
  };

  return (
    <AuthLayout>
      <motion.div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="w-full bg-blue-600 text-white py-3 rounded">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already have account?{" "}
          <span
            onClick={() =>
              navigate("/login", { state: location.state })
            }
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </AuthLayout>
  );
}