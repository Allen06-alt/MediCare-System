export default function DoctorAppointmentCard({ appointment, onOpen }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex justify-between">

      <div>
        <p className="font-bold">{appointment.patientName}</p>
        <p className="text-sm">{appointment.symptoms}</p>
        <p className="text-sm">{appointment.slot}</p>
      </div>

      <button
        onClick={onOpen}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Open
      </button>

    </div>
  );
}