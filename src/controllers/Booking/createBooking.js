const prisma = require('../../models/prisma');
const createError = require('../../utils/create_error');

exports.createBooking = async (req, res, next) => {
    try {
        const { arrival, departure, paymentSlip, paymentStatus, roomId } = req.body
        // const booked = await prisma.booking.findFirst({
        //     where: {
        //         room_id: +roomId,
        //         NOT: {
        //             OR: [
        //                 {
        //                     arrival: {
        //                         gte: arrival,
        //                     },
        //                     // arrival: {
        //                     //     lte: departure
        //                     // }
        //                 },
        //                 {
        //                     // departure: {
        //                     //     lte: departure,
        //                     // },
        //                     // departure: {
        //                     //     gte: arrival
        //                     // }
        //                     arrival: {
        //                         lte: departure
        //                     }
        //                 },
        //             ],
        //         },
        //     },
        // })

        const booked = await prisma.$queryRaw`SELECT * FROM booking WHERE room_id = ${roomId} and arrival NOT BETWEEN ${arrival} AND ${departure} and departure NOT BETWEEN ${arrival} AND ${departure}`

        console.log(booked);

        if (!booked) {
            return next(createError("Can't book for this day", 400))
        }

        const booking = await prisma.booking.create({
            data: { userId: req.user.id, arrival: new Date(arrival), departure: new Date(departure), room_id: +roomId }
        })
        res.status(200).json(booking)
    } catch (error) {
        next(error)
    }
}