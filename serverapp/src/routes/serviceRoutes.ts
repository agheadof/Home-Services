// routes/serviceRoutes.ts

import express from "express";
import { authenticateAdminToken } from "../middleware/authMiddleware.js";
import serviceController from "../controllers/serviceController.js";
import { upload } from "../middleware/fileUpDown.js";

const router = express.Router();

// Routes for managing services
router.get("/", serviceController.getAllServices);
router.post(
	"/create",
	authenticateAdminToken,
	upload,
	serviceController.createService,
);
router.get("/:id", serviceController.getServiceById);
router.put(
	"/update/:id",
	authenticateAdminToken,
	upload,
	serviceController.updateService,
);
router.delete(
	"/delete/:id",
	authenticateAdminToken,
	serviceController.deleteService,
);
export default router;
