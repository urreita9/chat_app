//path api/messages
const { Router } = require('express');
const { getChat } = require('../controllers/messages');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.get('/:from', validateJWT, getChat);

module.exports = router;
