const express = require('express');
const authController = require('../controllers/authController');
const authenticatedMiddleware = require('../middlewares/authenticated');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);


router.post('/admin/login', authController.adminLogin);
router.get('/me', authenticatedMiddleware, authController.getMe);

module.exports = router;