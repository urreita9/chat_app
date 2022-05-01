const {
	userConnected,
	userDisconnected,
	getUsers,
} = require('../controllers/sockets');
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
			//Validate JWT
			if (!valid) {
				console.log('Unidentified socket');
				return socket.disconnect();
			}
			// Active User with uid
			await userConnected(uid);

			//Emit all active users

			this.io.emit('users-list', await getUsers());
			// Socket join, uid
			//Listen on client messages

			socket.on('disconnect', async () => {
				//Handle disconnect
				await userDisconnected(uid);
				this.io.emit('users-list', await getUsers());
			});
		});
	}
}

module.exports = Sockets;
