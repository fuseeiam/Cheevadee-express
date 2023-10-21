const prisma = require("../models/prisma");

exports.createRoom = async (req, res, next) => {
    try {
        const user = req.user
        const { price, ...roomDetail } = req.body

        console.log(req.body);
        console.log(roomDetail);
        const room = await prisma.room.create({
            data: { ...roomDetail, price: +price }
        })
        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
}

exports.getAllRoom = async (req, res, next) => {
    try {

        const allRoom = await prisma.room.findMany({
            include: {

            }
        })

        res.status(200).json(allRoom)
    } catch (err) {
        next(err)
    }
}
