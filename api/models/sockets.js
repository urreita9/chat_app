class Sockets {
	constructor(io) {
		this.io = io;

		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on('connection', (socket) => {
			//Validate JWT
			// No token? OUT
			// Active User with uid
			//Emit all active users
			// Socket join, uid
			//Listen on client messages
			//Handle disconnect
		});
	}
}

module.exports = Sockets;
