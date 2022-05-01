const { userConnected, userDisconnected } = require('../controllers/sockets');
const { verifyJWT } = require('../helpers/jwt');

class Sockets {
	constructor(io) {
		this.io = io;

		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on('connection', async (socket) => {
			const [valid, uid] = verifyJWT(socket.handshake.query['x-token']);

			if (!valid) {
				console.log('Unidentified socket');
				return socket.disconnect();
			}

			const user = await userConnected(uid);

			//Emit all active users
			// Socket join, uid
			//Listen on client messages
			//Handle disconnect

			socket.on('disconnect', async () => {
				await userDisconnected(uid);
			});
		});
	}
}

module.exports = Sockets;
