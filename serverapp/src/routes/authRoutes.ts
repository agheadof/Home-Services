// routes/authRoutes.ts

import { Router } from "express";
import { upload } from "../middleware/fileUpDown.js";
import userController from "../controllers/userController.js";

const router: Router = Router();

// Login route
router.post("/login", userController.loginUser);

export default router;
