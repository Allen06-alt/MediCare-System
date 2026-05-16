// 🔥 SYMPTOM → DEPARTMENT
export const symptomToDepartment = {
  fever: "General",
  cold: "General",
  skin: "Dermatologist",
  acne: "Dermatologist",
  heart: "Cardiologist",
  chest: "Cardiologist",
  brain: "Neurologist",
  headache: "Neurologist",
  teeth: "Dentist",
  child: "Pediatrician",
  bone: "Orthopedic",
};

// 🔥 GET DEPARTMENT FROM SYMPTOM
export const getDepartment = (symptom) => {
  return symptomToDepartment[symptom.toLowerCase()] || "General";
};

// 🔥 FILTER DOCTORS BASED ON DEPARTMENT
export const suggestDoctors = (doctors, department) => {
  return doctors.filter(
    (doc) => doc.specialization === department
  );
};

// 🔥 NEW: DEFAULT SYMPTOM FROM DEPARTMENT
export const getDefaultSymptom = (department) => {
  switch (department) {
    case "Dermatologist":
      return "skin";
    case "Cardiologist":
      return "heart";
    case "Neurologist":
      return "brain";
    case "Dentist":
      return "teeth";
    case "Pediatrician":
      return "child";
    case "Orthopedic":
      return "bone";
    default:
      return "";
  }
};