const prisma = require('../models/prisma');
const { upload } = require('../utils/cloudinary-service');

exports.getAllBooking = async (req, res, next) => {
    try {
        const allBooking = await prisma.booking.findMany({
            include: {
                user: true,
                room: true
            }
        })
        res.status(201).json({ allBooking })

    } catch (err) {
        next(err);
    }
}

exports.confirmSlip = async (req, res, next) => {
    try {
        const completed = await prisma.booking.update({
            where: {
                id: +req.params.id
            },
            data: {
                paymentStatus: "COMPLETED"
            }
        })
        res.status(201).json({ completed })
    } catch (err) {
        next(err)
    }
}

exports.rejectSlip = async (req, res, next) => {
    try {
        const rejected = await prisma.booking.update({
            where: {
                id: +req.params.id
            },
            data: {
                paymentStatus: "CHECKING"
            }
        })
        res.status(201).json({ rejected })
    } catch (err) {
        next(err)
    }
}

exports.getAllBookingStatus = async (req, res, next) => {
    try {
        const allBooking = await prisma.booking.findMany({
            include: {
                user: true,
                room: true
            }
        })
        res.status(201).json({ allBooking })

    } catch (err) {
        next(err);
    }
}

exports.confirmBooking = async (req, res, next) => {
    try {
        const completed = await prisma.booking.update({
            where: {
                id: +req.params.id
            },
            data: {
                bookingStatus: "COMPLETED"
            }
        })
        res.status(201).json({ completed })
    } catch (err) {
        next(err)
    }
}

exports.rejectBooking = async (req, res, next) => {
    try {
        const rejected = await prisma.booking.update({
            where: {
                id: +req.params.id
            },
            data: {
                bookingStatus: "CANCEL"
            }
        })
        res.status(201).json({ rejected })
    } catch (err) {
        next(err)
    }
}

exports.getAllUser = async (req, res, next) => {
    try {
        const allUser = await prisma.user.findMany({

        })
        res.status(201).json({ allUser })
    } catch (err) {
        next(err);
    }
}

exports.getAllRoom = async (req, res, next) => {
    try {
        const allRoom = await prisma.room.findMany({})
        res.status(201).json({ allRoom })
    } catch (err) {
        next(err);
    }
}

exports.createRoom = async (req, res, next) => {
    try {
        console.log(req.body);
        console.log(req.file);
        const value = req.body
        const response = {}
        if (req.file) {
            const url = await upload(req.file.path)
            response.pictureRoom = url
        }
        const room = await prisma.room.create({
            data: {
                roomtype: value.roomtype,
                bed: value.bed,
                picture: response.pictureRoom,
                roomSize: value.roomSize,
                view: value.view,
                price: +value.price,
                isMaintaining: false
            }
        })
        res.status(201).json({ room })
    } catch (error) {
        next(error)
    }
}

exports.maintaining = async (req, res, next) => {
    try {
        const maintain = await prisma.room.update({
            where: {
                id: +req.params.id
            },
            data: {
                isMaintaining: true
            }
        })
        res.status(201).json({ maintain })
    } catch (err) {
        next(err)
    }
}
exports.remaintaining = async (req, res, next) => {
    try {
        const remaintain = await prisma.room.update({
            where: {
                id: +req.params.id
            },
            data: {
                isMaintaining: false
            }
        })
        res.status(201).json({ remaintain })
    } catch (err) {
        next(err)
    }
}