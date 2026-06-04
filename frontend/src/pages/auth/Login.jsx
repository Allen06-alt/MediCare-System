import {
  useState,
  useContext,
  useEffect,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { motion } from "framer-motion";

import API from "../../api/api";

import { AuthContext } from "../../context/AuthContext";

import AuthLayout from "../../components/layout/AuthLayout";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { login, user } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();

  // AUTO REDIRECT
  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case "doctor":
        navigate("/doctor", {
          replace: true,
        });
        break;

      case "admin":
        navigate("/admin", {
          replace: true,
        });
        break;

      default:
        navigate("/dashboard", {
          replace: true,
        });
    }
  }, [user, navigate]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.email ||
      !form.password
    ) {
      setError(
        "All fields are required"
      );
      return;
    }

    try {
      const res = await API.post(
        "/auth/login",
        form
      );

      const userData = res.data;

      login(userData);

      switch (
        userData.role
      ) {
        case "doctor":
          navigate("/doctor");
          break;

        case "admin":
          navigate("/admin");
          break;

        default:
          navigate(
            "/dashboard"
          );
      }
    } catch (err) {
      setError(
        err.response?.data ||
          "Login Failed ❌"
      );
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">
              🏥
            </span>
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-2">
            Login to access your
            Medicare account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={
              handleChange
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={
              handleChange
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() =>
              navigate(
                "/signup",
                {
                  state:
                    location.state,
                }
              )
            }
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </AuthLayout>
  );
}