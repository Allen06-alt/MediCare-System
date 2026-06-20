// 🔥 FETCH BOOKINGS
const fetchAppointments = () => {
  if (!user?.email) return;

  API.get(`/api/bookings/${user.email}`)
    .then((res) => {
      console.log("Appointments:", res.data);
      setAppointments(
        Array.isArray(res.data)
          ? res.data
          : [res.data]
      );
    })
    .catch((err) => console.log(err));
};

// 🔥 FETCH FAMILY
const fetchFamily = () => {
  if (!user?.email) return;

  API.get(`/api/family/${user.email}`)
    .then((res) => setFamily(res.data))
    .catch((err) => console.log(err));
};

// 🔥 FETCH PRESCRIPTIONS
const fetchPrescriptions = () => {
  if (!user?.email) return;

  API.get("/api/prescriptions")
    .then((res) => {
      const filtered = res.data.filter(
        (p) => p.patientEmail === user.email
      );

      setPrescriptions(filtered);
    })
    .catch((err) => console.log(err));
};