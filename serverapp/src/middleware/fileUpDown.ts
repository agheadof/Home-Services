import multer from "multer";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "Assets");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

export const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		const fileTypes = /jpeg|jpg|png/;
		const mimeType = fileTypes.test(file.mimetype);
		const extname = fileTypes.test(path.extname(file.originalname));

		if (mimeType && extname) {
			return cb(null, true);
		}
		cb("Give a proper files formate to upload");
	},
}).single("file");

export const deleteImage = (req) => {
	let docPath = path.basename(req);
	const File = path.join(__dirname, "..", "..", "Assets/", docPath);

	fs.unlinkSync(File);
};
