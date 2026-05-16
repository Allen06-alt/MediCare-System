// components/ProtectedRoute.jsx

import {
  Navigate,
} from "react-router-dom";

import {
  useContext,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

export default function ProtectedRoute({

  children,

  role,

}) {

  const { user } =
    useContext(AuthContext);

  // ❌ NOT LOGGED IN
  if (!user) {

    return (

      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ❌ ROLE NOT MATCHED
  if (

    role &&

    user.role !== role
  ) {

    // 🔥 REDIRECT BASED ON ROLE
    switch (user.role) {

      case "doctor":

        return (

          <Navigate
            to="/doctor"
            replace
          />
        );

      case "admin":

        return (

          <Navigate
            to="/admin"
            replace
          />
        );

      default:

        return (

          <Navigate
            to="/dashboard"
            replace
          />
        );
    }
  }

  // ✅ ACCESS GRANTED
  return children;
}