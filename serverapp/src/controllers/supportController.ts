// controllers/supportController

import Ticket from "../models/ticketModel.js";
import { RequestHandler } from "express";

// Controller functions for handling support messages
const getAllTickets: RequestHandler = async (req, res) => {
	try {
		const ticket = await Ticket.find();
		res.json(ticket);
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message });
		} else {
			res.status(500).json({ message: "An error occurred" });
		}
	}
};

const getTicketById: RequestHandler = async (req, res) => {
	try {
		const ticket = await Ticket.findById(req.params.id);
		if (!ticket) {
			return res.status(404).json({ message: "Ticket not found" });
		}
		res.json(ticket);
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message });
		} else {
			res.status(500).json({ message: "An error occurred" });
		}
	}
};

const createTicket: RequestHandler = async (req, res) => {
	const ticket = new Ticket({
		user_id: req.body.user_id,
		userName: req.body.userName,
		title: req.body.title,
		message: req.body.message,
	});

	try {
		const newTicket = await ticket.save();
		res.status(201).json(newTicket);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "An error occurred" });
		}
	}
};

const replyMessage: RequestHandler = async (req, res) => {

	try {
		let body = {
			reply: req.body.reply,
			status: 'closed',
		};
		const ticket = await Ticket.findByIdAndUpdate(
			req.params.id,
			body,
			{
				new: true,
			},
		);
		res.json(ticket);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "An error occurred" });
		}
	}
};

// Logic for replying to support messages
// for replaying to message you should do it via socket.io
// just select the user_id from the db and emit a message event the server is listening !

export default {
	getAllTickets,
	getTicketById,
	createTicket,
	replyMessage,
};
