// models/supportMessageModel.ts

import mongoose, { Document, Schema } from "mongoose";

export interface ITicket extends Document {
	user_id: string;
	userName: string;
	title: string;
	message: '';
	reply: '';
	timestamp: Date;
	status: string;
}

const supportMessageSchema: Schema = new mongoose.Schema({
	user_id: { type: String, required: true },
	userName: { type: String, required: true },
	title: { type: String, required: true },
	message: { type: String, required: true },
	reply: { type: String },
	timestamp: { type: Date, default: Date.now },
	status: { type: String, default: 'open', Enum: ["open", "closed"] },

});

const Ticket = mongoose.model<ITicket>(
	"Ticket",
	supportMessageSchema,
);

export default Ticket;
