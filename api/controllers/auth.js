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

		res.json({ ok: true, user, token });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ ok: false, msg: 'Error. Please contact the Administrator' });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const userDb = await User.findOne({ email });

		if (!userDb) {
			return res.status(404).json({ msg: 'Email or Password are incorrect' });
		}

		const validPassword = bcrypt.compareSync(password, userDb.password);

		if (!validPassword) {
			return res.status(404).json({ msg: 'Email or Password are incorrect' });
		}

		//Generate JWT

		const token = await generateJWT(userDb.id);

		res.json({ ok: true, user: userDb, token });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ ok: false, msg: 'Error. Please contact the Administrator' });
	}
};

const renewToken = async (req, res) => {
	const uid = req.uid;

	try {
		//New JWT

		const token = await generateJWT(uid);

		//Get user

		const user = await User.findById(uid);

		res.json({ ok: true, user, token });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ ok: false, msg: 'Error. Please contact the Administrator' });
	}
};

module.exports = { createUser, loginUser, renewToken };
