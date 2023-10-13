const express = require('express');
const router = express.Router();
const auth = require('../middlewares/AuthMiddleware.js');

router.post('/', auth.userVerification)

module.exports = router;