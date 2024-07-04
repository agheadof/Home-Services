import express from "express";
import { authenticateAdminToken } from "../middleware/authMiddleware.js";
import bookingController from "../controllers/bookingController.js";

const router = express.Router();

router.post("/request", bookingController.requestService);
router.get("/getRequests/:id", bookingController.getRequestsByUserId);
router.get("/getAllRequests/",
    authenticateAdminToken, bookingController.getAllRequests);
router.put(
    "/updateRequestStatus/:id",
    authenticateAdminToken,
    bookingController.updateRequestStatus,
);

router.get("/:id", bookingController.getBookingQuestions);

router.post(
    "/",
    authenticateAdminToken,
    bookingController.createBookingQuestions,
);

router.put(
    "/updateBook/:id",
    authenticateAdminToken,
    bookingController.updateBookingQuestion,
);

router.delete(
    "/deleteBook/:id",
    authenticateAdminToken,
    bookingController.deleteBookingQuestion,
);



export default router;
