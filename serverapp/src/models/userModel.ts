// models/userModel.ts

import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
	type: string;
	name: string;
	email: string;
	phone_number?: string;
	password: string;
	image: string;
}

const userSchema: Schema = new mongoose.Schema({
	type: { type: String, required: true, enum: ["super", "admin", "customer"] },
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phone_number: { type: String },
	password: { type: String, required: true },
	image: { type: String, required: false },
});

userSchema.pre<IUser>("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
