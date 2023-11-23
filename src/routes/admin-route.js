const express = require('express');
const authController = require('../controllers/authController');
const authenticateMiddleware = require('../middlewares/authenticated');
const uploadMiddleware = require('../middlewares/upload')
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/checkbooking', adminController.getAllBooking);
router.patch(`/paymentStatus/:id`, adminController.confirmSlip);
router.patch(`/rejectStatus/:id`, adminController.rejectSlip);

router.get('/bookingStatus', adminController.getAllBookingStatus);
router.patch(`/confirmbookingStatus/:id`, adminController.confirmBooking);
router.patch(`/rejectbookingStatus/:id`, adminController.rejectBooking);

router.get('/checkUser', adminController.getAllUser);

router.get('/getallroom', adminController.getAllRoom);
router.post('/createroom', uploadMiddleware.single('picture'), adminController.createRoom);
router.patch(`/maintaining/:id`, adminController.maintaining);
router.patch(`/remaintaining/:id`, adminController.remaintaining);
// router.patch('/editroom', adminController.editRoom);



module.exports = router;