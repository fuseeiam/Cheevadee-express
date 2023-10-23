const express = require('express');

const roomController = require('../controllers/roomController');
const authenticatedMiddleware = require('../middlewares/authenticated');
const uploadMiddleware = require('../middlewares/upload');

const router = express.Router();

router.post('/create', authenticatedMiddleware,

    uploadMiddleware.single([
        // { name: 'roomImage', maxCount: 1 }
    ]),
    roomController.createRoom
);

router.get("/all-room", roomController.getAllRoom)
router.get("/:roomId", roomController.getRoomById)



module.exports = router;