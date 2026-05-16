// 🔥 EMAIL VALIDATION
export const validateEmail = (email) => {
  return email.includes("@");
};

// 🔥 PHONE VALIDATION
export const validatePhone = (phone) => {
  return phone.length >= 10;
};

// 🔥 REQUIRED CHECK
export const required = (value) => {
  return value && value.trim() !== "";
};

// 🔥 BOOKING VALIDATION (STEP-WISE)
export const validateBookingStep = (step, data) => {

  if (step === 2) {
    if (!required(data.name)) return "Name required";
    if (!validatePhone(data.phone)) return "Invalid phone";
  }

  if (step === 5) {
    if (!data.slot) return "Select slot";
  }

  return null;
};