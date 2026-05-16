import Doctor from "../models/Doctor.js";


// ✅ GET ALL
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json("Error fetching doctors ❌");
  }
};


// ✅ GET ONE
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json("Doctor not found ❌");
    }

    res.json(doctor);
  } catch (err) {
    res.status(500).json("Error ❌");
  }
};


// ✅ CREATE
export const createDoctor = async (req, res) => {
  try {
    const { name, email } = req.body;

    // 🔥 VALIDATION
    if (!name || !email) {
      return res.status(400).json("Name & Email required ❌");
    }

    // 🔥 DUPLICATE CHECK
    const existing = await Doctor.findOne({ email });
    if (existing) {
      return res.status(400).json("Doctor already exists ❌");
    }

    const doctor = await Doctor.create(req.body);

    res.status(201).json({
      message: "Doctor created ✅",
      data: doctor,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json("Error creating doctor ❌");
  }
};


// ✅ BULK INSERT
export const bulkInsertDoctors = async (req, res) => {
  try {
    const doctors = req.body;

    if (!Array.isArray(doctors)) {
      return res.status(400).json("Data must be array ❌");
    }

    // 🔥 VALIDATE EACH DOCTOR
    for (let d of doctors) {
      if (!d.name || !d.email) {
        return res.status(400).json("Each doctor needs name & email ❌");
      }
    }

    const inserted = await Doctor.insertMany(doctors, { ordered: false });

    res.status(201).json({
      message: "Doctors inserted ✅",
      count: inserted.length,
      data: inserted,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json("Bulk insert error ❌ (maybe duplicate email)");
  }
};


// ✅ FULL UPDATE
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json("Doctor not found ❌");
    }

    res.json({
      message: "Updated ✅",
      data: doctor,
    });

  } catch (err) {
    res.status(500).json("Error updating doctor ❌");
  }
};


// ✅ PARTIAL UPDATE
export const patchDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json("Doctor not found ❌");
    }

    Object.keys(req.body).forEach((key) => {
      doctor[key] = req.body[key];
    });

    const updated = await doctor.save();

    res.json({
      message: "Patched ✅",
      data: updated,
    });

  } catch (err) {
    res.status(500).json("Error patching doctor ❌");
  }
};


// ✅ DELETE
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json("Doctor not found ❌");
    }

    res.json({
      message: "Doctor deleted ✅",
    });

  } catch (err) {
    res.status(500).json("Error deleting doctor ❌");
  }
};