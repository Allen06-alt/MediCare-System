import Family from "../models/Family.js";

// ✅ ADD FAMILY
export const addFamily =
  async (req, res) => {

    try {

      const member =
        await Family.create(
          req.body
        );

      res.status(201).json(
        member
      );

    } catch (err) {

      console.log(err);

      res.status(500).json(
        "Add family failed ❌"
      );
    }
  };

// ✅ GET FAMILY
export const getFamily =
  async (req, res) => {

    try {

      const members =
        await Family.find({

          userEmail:
            req.params.email,
        });

      res.json(
        members
      );

    } catch (err) {

      console.log(err);

      res.status(500).json(
        "Fetch failed ❌"
      );
    }
  };

// ✅ DELETE FAMILY
export const deleteFamily =
  async (req, res) => {

    try {

      await Family.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Family member deleted ✅",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json(
        "Delete failed ❌"
      );
    }
  };