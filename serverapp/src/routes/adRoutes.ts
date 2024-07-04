import express from "express";
import adController from "../controllers/adController.js";
import { authenticateAdminToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/fileUpDown.js";

const router = express.Router();

// Routes for managing ads
router.get("/", adController.getAllAds);
router.post("/", authenticateAdminToken, upload, adController.createAd);
router.get("/:id", adController.getAdById);
router.put("/:id", authenticateAdminToken, upload, adController.updateAd);
router.delete("/:id", authenticateAdminToken, adController.deleteAd);

export default router;
