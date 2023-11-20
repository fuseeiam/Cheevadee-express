
const express = require('express');
const authenticatedMiddleware = require('../middlewares/authenticated');
const { createBooking } = require("../controllers/Booking/createBooking")
const uploadMiddleware = require('../middlewares/upload');
const router = express.Router();
const postController = require("../../src/controllers/Booking/PostSlipBooking");
const { getBookingByID } = require('../controllers/Booking/getBookingById');

// router.post('/reserve', authenticatedMiddleware, createBooking);
router.post('/reserve',
    authenticatedMiddleware,
    uploadMiddleware.single('paymentSlip'),
    createBooking
)
router.get("/history", authenticatedMiddleware, getBookingByID)



module.exports = router;