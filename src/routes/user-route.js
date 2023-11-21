const express = require('express');

const userController = require('../controllers/userController');
const authenticatedMiddleware = require('../middlewares/authenticated');
const uploadMiddleware = require('../middlewares/upload');

const router = express.Router();

router.patch('/', authenticatedMiddleware,
    // uploadMiddleware.single('qwerty'),
    uploadMiddleware.fields([
        { name: 'profileImage', maxCount: 1 }
    ]),
    userController.updateProfile
);

router.patch(
    "/editprofile",
    authenticatedMiddleware,
    uploadMiddleware.single("profileImage"),
    userController.updateProfile
);

router.patch(
    "/editprofile",
    authenticatedMiddleware,
    uploadMiddleware.single("firstName"),
    userController.updateProfile
);

router.patch(
    "/editprofile",
    authenticatedMiddleware,
    uploadMiddleware.single("lastName"),
    userController.updateProfile
);

router.patch(
    "/editprofile",
    authenticatedMiddleware,
    uploadMiddleware.single("mobile"),
    userController.updateProfile
);


module.exports = router;