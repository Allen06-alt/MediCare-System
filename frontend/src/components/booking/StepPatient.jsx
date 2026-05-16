import { useContext, useEffect, useState } from "react";
import { BookingContext } from "../../context/BookingContext";
import API from "../../api/api";

export default function StepPatient() {
  const context = useContext(BookingContext);

  if (!context) return <p>Error loading booking</p>;

  const { booking, setBooking } = context;

  const user = JSON.parse(localStorage.getItem("user"));

  const [family, setFamily] = useState([]);

  // 🔥 FETCH FAMILY
  useEffect(() => {
    if (!user?.email) return;

    API.get(`/family/${user.email}`)
      .then((res) => {
        // 🔥 CLEAN DATA (REMOVE 0 / NULL)
        const clean = (res.data || []).filter(
          (f) => f && typeof f === "object" && f.name
        );
        setFamily(clean);
      })
      .catch(console.log);
  }, []);

  // 🔥 AUTO SELF
  useEffect(() => {
    if (booking.patientType === "self" && user) {
      setBooking((prev) => ({
        ...prev,
        name: user.name || "",
        phone: user.phone || "",
        patientId: null,
      }));
    }
  }, [booking.patientType]);

  // 🔥 FAMILY SELECT
  const handleFamilySelect = (e) => {
    const value = e.target.value;

    if (!value) return; // 🔥 avoid invalid selection

    const member = family.find((f) => f._id === value);

    if (!member) return;

    setBooking({
      ...booking,
      patientType: "family",
      patientId: member._id,
      name: member.name,
      age: member.age,
      phone: member.phone || "",
    });
  };

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select Patient</h2>

      {/* TYPE */}
      <select
        value={booking.patientType}
        onChange={(e) =>
          setBooking({
            ...booking,
            patientType: e.target.value,
            name: "",
            age: "",
            phone: "",
            patientId: null,
          })
        }
        className="border p-2 rounded mb-4"
      >
        <option value="self">Self</option>
        <option value="family">Family</option>
      </select>

      {/* FAMILY DROPDOWN */}
      {booking.patientType === "family" && (
        <>
          {family.length === 0 ? (
            <p className="text-sm text-gray-500 mb-3">
              No family members found
            </p>
          ) : (
            <select
              value={booking.patientId || ""}
              onChange={handleFamilySelect}
              className="border p-2 rounded mb-4 w-full"
            >
              {/* 🔥 FIXED DEFAULT OPTION */}
              <option value="">Select Family Member</option>

              {family.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.name} ({f.relation})
                </option>
              ))}
            </select>
          )}
        </>
      )}

      {/* NAME */}
      <input
        name="name"
        placeholder="Name"
        value={booking.name || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded mb-3"
      />

      {/* AGE */}
      <input
        name="age"
        placeholder="Age"
        value={booking.age || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded mb-3"
      />

      {/* PHONE */}
      <input
        name="phone"
        placeholder="Phone"
        value={booking.phone || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded"
      />
    </div>
  );
}