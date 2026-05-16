import Notification
from "../models/Notification.js";


// ✅ CREATE
export const createNotification =
  async (req, res) => {

    try {

      const notification =
        await Notification.create(
          req.body
        );

      res.status(201).json(
        notification
      );

    } catch (err) {

      res.status(500).json({
        message:
          "Failed to create notification",
      });
    }
  };


// ✅ GET
export const getNotifications =
  async (req, res) => {

    try {

      const notifications =
        await Notification.find({
          email:
            req.params.email,
        }).sort({
          createdAt: -1,
        });

      res.json(
        notifications
      );

    } catch (err) {

      res.status(500).json({
        message:
          "Failed to fetch notifications",
      });
    }
  };


// ✅ READ
export const markAsRead =
  async (req, res) => {

    try {

      const updated =
        await Notification.findByIdAndUpdate(

          req.params.id,

          {
            isRead: true,
          },

          {
            new: true,
          }
        );

      res.json(updated);

    } catch (err) {

      res.status(500).json({
        message:
          "Failed to update notification",
      });
    }
  };


// ✅ CLEAR
export const clearNotifications =
  async (req, res) => {

    try {

      await Notification.deleteMany({
        email:
          req.params.email,
      });

      res.json({
        message:
          "Notifications cleared",
      });

    } catch (err) {

      res.status(500).json({
        message:
          "Failed to clear notifications",
      });
    }
  };