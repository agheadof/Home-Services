import { Server } from "socket.io";

let io: Server;

export default {
	init: (httpServer: any) => {
		io = new Server(httpServer, { cors: { origin: "*" } });
		return io;
	},
	getIO: () => {
		if (!io) {
			throw new Error("Socket.io not initialized!");
		}
		return io;
	},
};
