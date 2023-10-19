const prisma = require("../models/prisma");

exports.createRoom = async (req, res, next) => {
    try {
        const user = req.user
        const { amount_room, price, roomtype_id, ...roomDetail } = req.body

        console.log(req.body);
        console.log(roomDetail);
        const room = await prisma.room.create({
            data: { ...roomDetail, amount_room: +amount_room, price: +price, roomtype_id: +roomtype_id }
        })
        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
}


