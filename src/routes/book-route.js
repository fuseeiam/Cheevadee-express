
const express = require('express');
const authenticatedMiddleware = require('../middlewares/authenticated');
const { createBooking } = require("../controllers/Booking/createBooking")

const router = express.Router();

router.post('/reserve', authenticatedMiddleware, createBooking);

module.exports = router;