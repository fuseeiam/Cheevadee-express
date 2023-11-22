const express = require('express');
const authController = require('../controllers/authController');
const authenticateMiddleware = require('../middlewares/authenticated');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/checkbooking', adminController.getAllBooking);
router.patch(`/paymentStatus/:id`, adminController.confirmSlip);
router.patch(`/rejectStatus/:id`, adminController.rejectSlip);

module.exports = router;