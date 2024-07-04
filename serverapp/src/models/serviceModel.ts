// models/serviceModel.ts

import mongoose, { Document, Schema } from "mongoose";
export interface IService extends Document {
	name: string;
	type: string;
	price: number;
	detailes: string;
	payment_methods: any[]; // Define appropriate type
	image: String;
}

const serviceSchema: Schema = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	price: { type: Number },
	detailes: { type: String, required: false },
	payment_methods: { type: String },
	image: { type: String },
});

const Service = mongoose.model<IService>("Service", serviceSchema);

export default Service;
