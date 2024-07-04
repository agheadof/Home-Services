import Ad from "../models/adModel.js";
import { RequestHandler } from "express";
import { deleteImage } from "../middleware/fileUpDown.js";

// Controller functions for managing ads
const getAllAds: RequestHandler = async (req, res) => {
	try {
		const ads = await Ad.find();
		res.json(ads);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "An error occurred" });
		}
	}
};

const createAd: any = async (req, res) => {
	const ad = new Ad({
		title: req.body.title,
		duration: req.body.duration,
		location: req.body.location,
		image: req.file.filename,
	});

	try {
		const newAd = await ad.save();
		res.status(201).json(newAd);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "An error occurred" });
		}
	}
};

const getAdById: RequestHandler = async (req, res) => {
	try {
		const ad = await Ad.findById(req.params.id);
		if (!ad) {
			return res.status(404).json({ message: "Ad not found" });
		}
		res.json(ad);
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message });
		} else {
			res.status(500).json({ message: "An error occurred" });
		}
	}
};

const updateAd: any = async (req, res) => {
	try {
		let oldImage: any = (await Ad.findById(req.params.id)).image;
		let image: any = oldImage;
		if (req.file) {
			image = req.file.filename;
			deleteImage(oldImage);
		}
		let body = {
			title: req.body.title,
			duration: req.body.duration,
			location: req.body.location,
			image: image,
		};
		const ad = await Ad.findByIdAndUpdate(req.params.id, body, {
			new: true,
		});
		res.json(ad);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "An error occurred" });
		}
	}
};

const deleteAd: RequestHandler = async (req, res) => {
	try {
		await Ad.findByIdAndDelete(req.params.id)
			.then((data) => {
				deleteImage(data.image);
			})
			.then(() => {
				res.json({ message: "Ad deleted" });
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
	getAllAds,
	createAd,
	getAdById,
	updateAd,
	deleteAd,
};
