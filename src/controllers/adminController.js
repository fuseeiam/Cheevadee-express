const prisma = require('../models/prisma');

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