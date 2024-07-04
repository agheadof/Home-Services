import express from "express";
import supportController from "../controllers/supportController.js";
import { authenticateAdminToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for handling support messages
router.post("/", supportController.createTicket);
router.put("/reply/:id", authenticateAdminToken, supportController.replyMessage);
router.get("/", authenticateAdminToken, supportController.getAllTickets);
router.get("/:id", supportController.getTicketById);

export default router;
