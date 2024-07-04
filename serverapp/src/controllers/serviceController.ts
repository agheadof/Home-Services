// controllers/serviceController.ts

import Service from "../models/serviceModel.js";
import { RequestHandler } from "express";
import { deleteImage } from "../middleware/fileUpDown.js";

import { config } from "dotenv";

config();

// Controller functions for managing services
const getAllServices: RequestHandler = async (req, res) => {
	try {
		const services = await Service.find();
		res.json(services);
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message });
		} else {
			res.status(500).json({ message: "An error occurred" });
		}
	}
};

const createService: any = async (req, res) => {
	const service = new Service({
		name: req.body.name,
		type: req.body.type,
		price: req.body.price,
		detailes: req.body.detailes,
		payment_methods: req.body.payment_methods,
		image: req.file.filename,
	});

	try {
		const newService = await service.save();
		res.send(201);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "An error occurred" });
		}
	}
};


const getServiceById: RequestHandler = async (req, res) => {
	try {
		const service = await Service.findById(req.params.id);
		if (!service) {
			return res.status(404).json({ message: "Service not found" });
		}
		res.json(service);
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message });
		} else {
			res.status(500).json({ message: "An error occurred" });
		}
	}
};


const updateService: any = async (req, res) => {
	try {
		let oldImage: any = (await Service.findById(req.params.id)).image;
		let image: any = oldImage;
		if (req.file) {
			image = req.file.filename;
			deleteImage(oldImage);
		}
		let body = {
			name: req.body.name,
			type: req.body.type,
			price: req.body.price,
			detailes: req.body.detailes,
			payment_methods: req.body.payment_methods,
			image: image,
		};
		const service = await Service.findByIdAndUpdate(req.params.id, body, {
			new: true,
		});
		res.json(service);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "An error occurred" });
		}
	}
};


const deleteService: RequestHandler = async (req, res) => {
	try {
		await Service.findByIdAndDelete(req.params.id)
			.then((data) => {
				deleteImage(data.image);
			})
			.then(() => {
				res.json({ message: "Service deleted" });
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
	getAllServices,
	createService,
	getServiceById,
	updateService,
	deleteService,

};
