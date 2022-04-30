// path: api/login
const { check } = require('express-validator');

const { Router } = require('express');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

//Create Users
router.post(
	'/new',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('password', 'Password is required').not().isEmpty(),
		check('email', 'Email is required').isEmail(),
		validateFields,
	],
	createUser
);

//Login
router.post(
	'/',
	[
		check('email', 'Email is required').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
		validateFields,
	],
	loginUser
);

//Revalidate Token
router.get('/renew', validateJWT, renewToken);

module.exports = router;
