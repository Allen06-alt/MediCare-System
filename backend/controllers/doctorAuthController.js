import Doctor
from "../models/Doctor.js";

import jwt
from "jsonwebtoken";

// ✅ DOCTOR LOGIN
export const doctorLogin =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // ✅ FIND DOCTOR
      const doctor =
        await Doctor.findOne({
          email,
        });

      // ❌ NOT FOUND
      if (!doctor) {

        return res
          .status(404)
          .json({

            message:
              "Doctor not found ❌",
          });
      }

      // ❌ WRONG PASSWORD
      if (
        doctor.password !==
        password
      ) {

        return res
          .status(401)
          .json({

            message:
              "Invalid password ❌",
          });
      }

      // ✅ TOKEN
      const token =
        jwt.sign(

          {
            id: doctor._id,

            role: "doctor",

            email:
              doctor.email,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }
        );

      // ✅ RESPONSE
      res.json({

        token,

        user: {

          _id:
            doctor._id,

          name:
            doctor.name,

          email:
            doctor.email,

          role: "doctor",
        },
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Doctor login failed ❌",
      });
    }
  };