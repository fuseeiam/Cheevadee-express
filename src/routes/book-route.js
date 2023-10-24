
const express = require('express');
const authenticatedMiddleware = require('../middlewares/authenticated');
const { createBooking } = require("../controllers/Booking/createBooking")
const uploadMiddleware = require('../middlewares/upload');
const router = express.Router();
const postController = require("../../src/controllers/Booking/PostSlipBooking");

router.post('/reserve', authenticatedMiddleware, createBooking);
router.post('/',
    authenticatedMiddleware,
    uploadMiddleware.single('image'),
    postController.createPostSlip
)


module.exports = router;