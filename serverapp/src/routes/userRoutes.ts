// routes/userRoutes.ts

import express from "express";
import userController from "../controllers/userController.js";
import {
	authenticateAdminToken,
	authenticateSuperToken,
} from "../middleware/authMiddleware.js";
import { upload } from "../middleware/fileUpDown.js";

const router = express.Router();

// Routes for managing users
router.post("/signup", upload, userController.createUser);
router.post("/admin", authenticateSuperToken, upload, userController.createUser);
router.get("/", authenticateSuperToken, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", upload, userController.updateUser);
router.delete("/:id", authenticateSuperToken, userController.deleteUser);


export default router;
