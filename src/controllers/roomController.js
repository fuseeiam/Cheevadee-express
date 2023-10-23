const prisma = require("../models/prisma");
const { checkRoomIdSchema } = require("../validators/room-validator")

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

exports.getRoomById = async (req, res, next) => {
    try {
        const { error } = checkRoomIdSchema.validate(req.params);
        if (error) {
            return next(error);
        }

        const roomId = +req.params.roomId;
        console.log('roomId:  ', roomId);
        const room = await prisma.room.findUnique({
            where: {
                id: roomId
            }
        });
        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
}

