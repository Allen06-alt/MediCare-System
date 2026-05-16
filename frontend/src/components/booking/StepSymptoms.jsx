import useBooking from "../../hooks/useBooking";
import { getDepartment } from "../../utils/doctorMapping";

export default function StepSymptoms() {
  const { booking, setBooking } = useBooking();

  const handleChange = (e) => {
    const symptom = e.target.value;

    setBooking({
      ...booking,
      symptoms: symptom,
      department: getDepartment(symptom),
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select Problem</h2>

      <select
        value={booking.symptoms || ""} // 🔥 FIX
        onChange={handleChange}
        className="w-full p-3 border rounded"
      >
        <option value="">-- Select --</option>
        <option value="heart">Heart Issue</option>
        <option value="skin">Skin Issue</option>
        <option value="brain">Brain / Nerve</option>
        <option value="teeth">Dental</option>
        <option value="child">Child Health</option>
        <option value="bone">Bone / Joint</option>
      </select>
    </div>
  );
}