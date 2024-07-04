import Notification from "../models/notificationModel.js";
import { RequestHandler } from "express";
import socket from "../socket.js";

// Controller function for sending notifications
const sendNotification: RequestHandler = async (req, res) => {
	const notification = new Notification({
		title: req.body.title,
		message: req.body.message,
	});
	try {
		const newNotification = await notification.save();
		socket.getIO().emit("notify", newNotification.message);
		res.status(201).json(newNotification);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "An error occurred" });
		}
	}
};

export default {
	sendNotification,
};
