import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/userModel.js";
import { config } from "dotenv";

config();

// Middleware function to verify JWT token
export const authenticateToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers["authorization"];
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	jwt.verify(token, process.env.SECRET_KEY!, (err, user) => {
		if (err) return res.status(403).json({ message: "Forbidden" });
		(req as any).user = user;
		next();
	});
};

// Middleware function to authorize Admin privileges
export const authenticateAdminToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers["authorization"];
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	jwt.verify(token, process.env.SECRET_KEY!, (err, user: any) => {
		if (err) return res.status(403).json({ message: "Forbidden" });
		if (user.type != "super" && user.type != "admin")
			return res.status(403).json({ message: "Not An Admin" });

		(req as any).user = user;
		next();
	});
};

export const authenticateSuperToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers["authorization"];

	if (!token) return res.status(401).json({ message: "Unauthorized" });

	jwt.verify(token, process.env.SECRET_KEY!, (err, user: any) => {

		if (err) return res.status(403).json({ message: "Forbidden" });
		if (user.type !== "super")
			return res.status(403).json({ message: "Not A Superviser" });

		(req as any).user = user.id;

		next();
	});
};

// Middleware function to generate JWT token
export const generateAccessToken = (user: IUser): string => {
	return jwt.sign(
		{ name: user.name, email: user.email, type: user.type, id: user._id },
		process.env.SECRET_KEY!,
		{ expiresIn: "15d" },
	);
};


