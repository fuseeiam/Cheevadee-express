const express = require('express');
const authController = require('../controllers/auth-controller');
const authenticateMiddleware = require('../middlewares/authenticated');

const router = express.Router();


module.exports = router;