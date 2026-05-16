import { useContext } from "react";
import { BookingContext } from "../../context/BookingContext";

export default function StepDetails() {
  const { booking, setBooking } = useContext(BookingContext);

  if (!booking) return null;

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Patient Details</h2>

      {/* NAME */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={booking.name}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
      />

      {/* AGE */}
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={booking.age}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
      />

      {/* PHONE */}
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={booking.phone}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}