// models/notificationModel.ts

import mongoose from "mongoose";

// Define the Notification schema
const notificationSchema = new mongoose.Schema({
	title: { type: String, required: true },
	message: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
});

// Create the Notification model
const Notification = mongoose.model("Notification", notificationSchema);

// Export the Notification model
export default Notification;
