// controllers/adminController.js

import Admin from "../models/Admin.js";


// ✅ GET ALL ADMINS
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();

    res.json(admins);

  } catch (err) {
    res.status(500).json("Error fetching admins ❌");
  }
};


// ✅ GET ADMIN BY ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json("Admin not found ❌");
    }

    res.json(admin);

  } catch (err) {
    res.status(500).json("Error fetching admin ❌");
  }
};


// ✅ CREATE ADMIN
export const createAdmin = async (req, res) => {
  try {

    const { name, email } = req.body;

    // 🔥 VALIDATION
    if (!name || !email) {
      return res.status(400).json("Name & Email required ❌");
    }

    // 🔥 DUPLICATE CHECK
    const existing = await Admin.findOne({ email });

    if (existing) {
      return res.status(400).json("Admin already exists ❌");
    }

    const admin = await Admin.create(req.body);

    res.status(201).json({
      message: "Admin created ✅",
      data: admin,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json("Error creating admin ❌");
  }
};


// ✅ BULK INSERT
export const bulkInsertAdmins = async (req, res) => {
  try {

    const admins = req.body;

    if (!Array.isArray(admins)) {
      return res.status(400).json("Data must be array ❌");
    }

    // 🔥 VALIDATION
    for (let a of admins) {
      if (!a.name || !a.email) {
        return res.status(400).json("Each admin needs name & email ❌");
      }
    }

    const inserted = await Admin.insertMany(admins, {
      ordered: false,
    });

    res.status(201).json({
      message: "Admins inserted ✅",
      count: inserted.length,
      data: inserted,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json("Bulk insert error ❌");
  }
};


// ✅ FULL UPDATE
export const updateAdmin = async (req, res) => {
  try {

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!admin) {
      return res.status(404).json("Admin not found ❌");
    }

    res.json({
      message: "Admin updated ✅",
      data: admin,
    });

  } catch (err) {
    res.status(500).json("Error updating admin ❌");
  }
};


// ✅ PATCH ADMIN
export const patchAdmin = async (req, res) => {
  try {

    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json("Admin not found ❌");
    }

    Object.keys(req.body).forEach((key) => {
      admin[key] = req.body[key];
    });

    const updated = await admin.save();

    res.json({
      message: "Admin patched ✅",
      data: updated,
    });

  } catch (err) {
    res.status(500).json("Error patching admin ❌");
  }
};


// ✅ DELETE ADMIN
export const deleteAdmin = async (req, res) => {
  try {

    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json("Admin not found ❌");
    }

    res.json({
      message: "Admin deleted ✅",
    });

  } catch (err) {
    res.status(500).json("Error deleting admin ❌");
  }
};