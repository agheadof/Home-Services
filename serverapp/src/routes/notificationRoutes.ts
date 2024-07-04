import * as express from "express";
import notificationController from "../controllers/notificationController.js";

const router = express.Router();

// Routes for sending notifications
router.post("/", notificationController.sendNotification);

export default router;
