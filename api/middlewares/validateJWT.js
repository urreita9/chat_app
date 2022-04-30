const jwt = require('jsonwebtoken');
const validateJWT = async (req, res, next) => {
	try {
		const token = req.header('x-token');

		if (!token) {
			return res.status(401).json({ ok: false, msg: 'No token ' });
		}

		const payload = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

		req.uid = payload.uid;
		next();
	} catch (error) {
		res.status(401).json({
			ok: false,
			msg: 'Invalid Token',
		});
	}
};

module.exports = { validateJWT };
