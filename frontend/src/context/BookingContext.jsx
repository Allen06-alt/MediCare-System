import { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState({
    patientType: "self",
    name: "",
    age: "",
    phone: "",
    symptoms: "",
    department: "",
    doctor: null,
    slot: "",
  });

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
};