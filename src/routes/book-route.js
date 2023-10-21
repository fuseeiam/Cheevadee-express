
const express = require('express');
const authenticatedMiddleware = require('../middlewares/authenticated');
const { createBooking } = require("../controllers/Booking/createBooking")

const router = express.Router();

router.post('/', authenticatedMiddleware, createBooking);



module.exports = router;