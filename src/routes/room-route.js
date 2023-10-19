const express = require('express');

const room_controller = require('../controllers/room_controller');
const authenticatedMiddleware = require('../middlewares/authenticated');
const uploadMiddleware = require('../middlewares/upload');

const router = express.Router();

router.post('/roomtable', authenticatedMiddleware,

    uploadMiddleware.single([
        // { name: 'roomImage', maxCount: 1 }
    ]),
    room_controller.createRoom
);

module.exports = router;