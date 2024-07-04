import { config } from "dotenv";
import express, {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";
import bodyParser from "body-parser";
import { authenticateToken } from "./middleware/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import adRoutes from "./routes/adRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from './routes/bookingRoutes.js'
import startServer from "./server.js";
import cors from "cors";

config();

// Initialize Express app
const app = express();

// Middlewares
// correcting cors errors
app.use(cors());

// Using body parser
app.use(bodyParser.json());

app.use("/images", express.static("Assets"));

// Use Authentication Routes
app.use("/api/auth", authRoutes);

// Protect other routes with authentication middleware
app.use("/api/services", serviceRoutes);
app.use("/api/support", authenticateToken, supportRoutes);
app.use("/api/ads", adRoutes);
app.use("/api/notifications", authenticateToken, notificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/booking", bookingRoutes);


// Default route handler
app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

// Error handler
const errorHandler: ErrorRequestHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(err.stack);
	res.status(500).json({ message: "Internal server error" });
};
app.use(errorHandler);

// Start the server
startServer();
export default app;
