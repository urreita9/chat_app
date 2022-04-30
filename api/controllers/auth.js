const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/user');
const createUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const emailExists = await User.findOne({ email });

		if (emailExists) {
			return res.status(400).json({ ok: false, msg: 'Email already exists' });
		}

		const user = new User(req.body);

		//TODO: bcrypt pass
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		//Generate JWT
		const token = await generateJWT(user.id);

		res.json({ user, token });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ ok: false, msg: 'Error. Please contact the Administrator' });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	res.json({ ok: true, email, password });
};

const renewToken = async (req, res) => {
	res.json({ ok: true, msg: 'Renew' });
};

module.exports = { createUser, loginUser, renewToken };
