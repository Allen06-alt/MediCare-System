import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// 🔥 CONTEXTS
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";

createRoot(document.getElementById("root")).render(

    <AuthProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </AuthProvider>
  
);