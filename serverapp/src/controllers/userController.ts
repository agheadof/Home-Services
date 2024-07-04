import User, { IUser } from "../models/userModel.js";
import { RequestHandler } from "express";
import { generateAccessToken } from "../middleware/authMiddleware.js";
import bcrypt from "bcrypt";
import { deleteImage } from "../middleware/fileUpDown.js";

// Controller functions for managing users
const createUser: any = async (req, res) => {
	try {
		const user = {
			type: req.body.type,
			name: req.body.name,
			email: req.body.email,
			phone_number: req.body.phone_number,
			password: req.body.password,
			image: req.file.filename,
		};
		if (user.type === "super" || user.type === "admin") {
			const creatorId = req.user;
			if (creatorId) {

				const isSuper: IUser | null = await User.findOne({
					_id: creatorId,
					type: "super",
				});
				if (isSuper) {
					const existingUser: IUser | null = await User.findOne({
						email: user.email,
					});

					if (existingUser)
						return res.status(409).json({ message: "User already exists" });

					const newUser: IUser = new User(user);
					await newUser.save();

					const accessToken: string = generateAccessToken(newUser);

					res.status(201).json({ accessToken });
				} else {
					res.status(400).json({
						message: "You are not autherizes to create an Admin user",
					});
				}
			} else {
				res.status(400).json({
					message: "You are not autherizes to create an Admin user",
				});
			}
		} else {
			const existingUser: IUser | null = await User.findOne({
				email: user.email,
			});

			if (existingUser)
				return res.status(409).json({ message: "User already exists" });

			const newUser: IUser = new User(user);
			await newUser.save();

			const accessToken: string = generateAccessToken(newUser);

			res.status(201).json({ accessToken });
		}
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "An error occurred" });
		}
	}
};

const loginUser: RequestHandler = async (req, res) => {
	const body = { email: req.body.email, password: req.body.password };
	const user: IUser | null = await User.findOne({ email: body.email });

	if (!user) return res.status(404).json({ message: "User not found" });

	const validPassword: boolean = await bcrypt.compare(
		body.password,
		user.password,
	);
	if (!validPassword)
		return res.status(401).json({ message: "Invalid password" });

	const accessToken: string = generateAccessToken(user);
	const username: string = user.name;
	const userType: string = user.type;

	res.json({ userType, username, accessToken });
};

const getAllUsers: RequestHandler = async (req, res) => {
	try {
		const user = await User.find();
		res.json(user);
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message });
		} else {
			res.status(500).json({ message: "An error occurred" });
		}
	}
};

const getUserById: RequestHandler = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message });
		} else {
			res.status(500).json({ message: "An error occurred" });
		}
	}
};

const updateUser: any = async (req, res) => {
	try {
		let oldImage: any = (await User.findById(req.params.id)).image;
		let image: any = oldImage;
		if (req.file) {
			image = req.file.filename;
			deleteImage(oldImage);
		}
		let hashedPassword
		if (req.body.password) {
			hashedPassword = await bcrypt.hash(req.body.password, 12)
		}
		let body = {
			name: req.body.name,
			phone_number: req.body.phone_number,
			password: hashedPassword,
			image: image,
		};
		const user = await User.findByIdAndUpdate(req.params.id, body, {
			new: true,
		});
		res.json(user);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "An error occurred" });
		}
	}
};

const deleteUser: RequestHandler = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id)
			.then((data) => {
				deleteImage(data.image);
			})
			.then(() => {
				res.json({ message: "User deleted" });
			})
			.catch((err) => {
				res.json(err);
			});
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message });
		} else {
			res.status(500).json({ message: "An error occurred" });
		}
	}
};

export default {
	createUser,
	getAllUsers,
	getUserById,
	loginUser,
	updateUser,
	deleteUser
};
