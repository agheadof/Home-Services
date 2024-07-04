import { config } from "dotenv";
import connectToMongoDB from "./config/database.js";
import socket from "./socket.js";
import app from "./app.js";

config();

const PORT = process.env.PORT || 5000;

// Starting http && webSocket
async function startServer() {
	await connectToMongoDB();

	const server = app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});

	const io = socket.init(server);

}

export default startServer;
