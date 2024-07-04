// models/bookingQuestionModel.ts

import mongoose, { Document, Schema, Types } from "mongoose";
import { IService } from "./serviceModel.js";

export interface IBookingQuestion extends Document {
	_service: IService["_id"];
	type: string;
	question: string;
	options?: string[]; // Define appropriate type
}

const bookingQuestionSchema: Schema = new mongoose.Schema({
	_service: { type: Types.ObjectId, required: true, ref: "Service" },
	type: { type: String, required: true, Enum: ["choice", "text", "date"] },
	question: { type: String, required: true },
	options: { type: Array },
});

const BookingQuestion = mongoose.model<IBookingQuestion>(
	"BookingQuestion",
	bookingQuestionSchema,
);

export default BookingQuestion;
