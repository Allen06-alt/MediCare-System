import {
  useState,
  useContext,
  useEffect,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { motion }
from "framer-motion";

import API
from "../../api/api";

import { AuthContext }
from "../../context/AuthContext";

import AuthLayout
from "../../components/layout/AuthLayout";

export default function Login() {

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const { login, user } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  const location =
    useLocation();

  // 🔥 AUTO REDIRECT
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

  }, [user]);

  // 🔥 INPUT CHANGE
  const handleChange = (
    e
  ) => {

    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  // 🔥 LOGIN
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !form.email ||
        !form.password
      ) {

        setError(
          "All fields required"
        );

        return;
      }

      try {

        const res =
          await API.post(
            "/auth/login",
            form
          );

        const userData =
          res.data;

        login(userData);

        // 🔥 ROLE NAVIGATION
        switch (
          userData.role
        ) {

          case "doctor":

            navigate(
              "/doctor"
            );

            break;

          case "admin":

            navigate(
              "/admin"
            );

            break;

          default:

            navigate(
              "/dashboard"
            );
        }

      } catch (err) {

        setError(

          err.response?.data ||

          "Login failed ❌"
        );
      }
    };

  return (
    <AuthLayout>

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <form
          onSubmit={
            handleSubmit
          }

          className="space-y-5"
        >

          {/* 🔥 EMAIL */}
          <input
            type="email"

            name="email"

            placeholder="Email"

            value={form.email}

            onChange={
              handleChange
            }

            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 🔥 PASSWORD */}
          <input
            type="password"

            name="password"

            placeholder="Password"

            value={form.password}

            onChange={
              handleChange
            }

            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 🔥 ERROR */}
          {error && (
            <p className="text-red-500 text-sm">

              {error}

            </p>
          )}

          {/* 🔥 BUTTON */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-bold">

            Login

          </button>

        </form>

      </motion.div>

    </AuthLayout>
  );
}