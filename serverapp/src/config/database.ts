import mongoose from "mongoose";
import { config } from "dotenv";

config();

// MongoDB connection URL
const mongoURL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
	console.log("Connected To MongoDB");
});

mongoose.connection.on("error", (err) => {
	console.error(`MongoDB Error: ${err}`);
});

// Establish MongoDB connection
async function connectToMongoDB() {
	await mongoose.connect(mongoURL!);
}
mongoose.connect(mongoURL!);

export default connectToMongoDB;
