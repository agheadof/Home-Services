// models/adModel.ts

import mongoose, { Document, Schema } from "mongoose";

export interface IAd extends Document {
	title: string;
	image: string;
	duration: number;
	location: string;
}

const adSchema: Schema = new mongoose.Schema({
	title: { type: String, required: true },
	image: { type: String, required: true },
	duration: { type: Number, required: true },
	location: { type: String },
});

const Ad = mongoose.model<IAd>("Ad", adSchema);

export default Ad;
