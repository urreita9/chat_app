const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = { uid };

		jwt.sign(
			payload,
			process.env.SECRET_OR_PRIVATE_KEY,
			{
				expiresIn: '24h',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('Error, Couldnt generate JWT');
				} else {
					resolve(token);
				}
			}
		);
	});
};

const verifyJWT = (token = '') => {
	try {
		const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

		return [true, uid];
	} catch (error) {
		console.log(error);
		return [false, null];
	}
};

module.exports = { generateJWT, verifyJWT };
