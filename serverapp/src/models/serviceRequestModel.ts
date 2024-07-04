// models/serviceRequestModel.ts

import mongoose, { Document, Schema, Types } from "mongoose";
import { IUser } from "./userModel.js";
import { IService } from "./serviceModel.js";
import { IBookingQuestion } from "./bookingQuestionModel.js";

export interface IServiceRequest extends Document {
	user_id: IUser["_id"];
	service_id: IService["_id"];
	answers: string[]; // Define appropriate type
	status: string;
	date: Date;
}

const serviceRequestSchema: Schema = new mongoose.Schema({
	user_id: { type: Types.ObjectId, required: true, ref: "User" },
	service_id: { type: Types.ObjectId, required: true, ref: "Service" },
	answers: { type: Array, required: true },
	status: { type: String, default: 'inProgress', Enum: ['inProgress', 'done'] },
	date: { type: Date, required: true },
});

const ServiceRequest = mongoose.model<IServiceRequest>(
	"ServiceRequest",
	serviceRequestSchema,
);

export default ServiceRequest;
