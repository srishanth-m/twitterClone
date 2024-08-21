import Notification from "../models/notificaion.model.js";
import User from "../models/user.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.find(userId);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.log("error in getNotifications", error.message);
    req.status(400).josn({ error: "internal server error" });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.find(userId);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "notifications deleted successfully" });
  } catch (error) {
    console.log("error in getNotifications", error.message);
    req.status(400).josn({ error: "internal server error" });
  }
};

export const deleteOneNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user._id;

    const notificaion = await Notification.findById(notificationId);
    if (!notificationId) {
      return res.status(404).json({ error: "notification does not exist" });
    }

    if (notificaion.to.toString() !== userId.toString()) {
      return res.status(400).json({ error: "you cannot delete this" });
    }

    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: "notication deleted successfully" });
  } catch (error) {
    console.log("error in getNotifications", error.message);
    req.status(400).josn({ error: "internal server error" });
  }
};
