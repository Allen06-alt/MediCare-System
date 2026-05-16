import User from "../models/User.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";


// 🔥 REGISTER USER
export const registerUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        role,
      } = req.body;

      // 🔥 CHECK EXISTING
      const existing =
        await User.findOne({
          email,
        });

      if (existing) {

        return res.status(400).json(
          "User already exists ❌"
        );
      }

      // 🔥 HASH PASSWORD
      const hashed =
        await bcrypt.hash(
          password,
          10
        );

      // 🔥 CREATE USER
      const user =
        await User.create({

          name,

          email,

          password:
            hashed,

          role:
            role ||
            "patient",
        });

      res.json({

        _id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,
      });

    } catch (err) {

      console.error(err);

      res.status(500).json(
        "Registration failed ❌"
      );
    }
  };



// 🔥 CREATE ADMIN
export const createAdmin =
  async (req, res) => {

    try {

      const existing =
        await User.findOne({

          email:
            "admin@gmail.com",
        });

      if (existing) {

        return res.status(400).json(
          "Admin already exists ❌"
        );
      }

      // 🔥 HASH
      const hashed =
        await bcrypt.hash(
          "123456",
          10
        );

      // 🔥 CREATE
      const admin =
        await User.create({

          name:
            "Admin",

          email:
            "admin@gmail.com",

          password:
            hashed,

          role:
            "admin",
        });

      res.json({

        message:
          "Admin created ✅",

        admin,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json(
        "Admin creation failed ❌"
      );
    }
  };



// 🔥 BULK REGISTER
export const bulkRegisterUsers =
  async (req, res) => {

    try {

      const users =
        req.body;

      if (
        !Array.isArray(users)
      ) {

        return res.status(400).json(
          "Data must be array ❌"
        );
      }

      const processedUsers =
        [];

      for (let u of users) {

        const exists =
          await User.findOne({
            email: u.email,
          });

        if (exists)
          continue;

        const hashed =
          await bcrypt.hash(
            u.password,
            10
          );

        processedUsers.push({

          name:
            u.name,

          email:
            u.email,

          password:
            hashed,

          role:
            u.role ||
            "patient",
        });
      }

      const inserted =
        await User.insertMany(
          processedUsers
        );

      res.json({

        message:
          "Users created ✅",

        count:
          inserted.length,

        data:
          inserted,
      });

    } catch (err) {

      console.error(err);

      res.status(500).json(
        "Bulk register failed ❌"
      );
    }
  };



// 🔥 LOGIN
export const loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // 🔥 FIND USER
      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(400).json(
          "User not found ❌"
        );
      }

      // 🔥 PASSWORD CHECK
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json(
          "Invalid password ❌"
        );
      }

      // 🔥 TOKEN
      const token =
        jwt.sign(

          {
            id:
              user._id,

            role:
              user.role,
          },

          process.env.JWT_SECRET
        );

      res.json({

        _id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,

        token,
      });

    } catch (err) {

      console.error(err);

      res.status(500).json(
        "Login failed ❌"
      );
    }
  };