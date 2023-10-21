const prisma = require('../../models/prisma');
const createError = require('../../utils/create_error');

exports.createBooking = async (req, res, next) => {
    // 1 จองช่วง เวลา ที่เคยจองไปแล้ว ไม่ได้
    try {
        const { bookArrival, bookDeparture, paymentSlip, paymentStatus, roomId } = req.body
        console.log("roomId  ", roomId);
        const bookedBetweenDate = await prisma.booking.findFirst({
            where: {
                roomId: +roomId,
                arrival: {
                    lte: new Date(bookArrival)
                },
                departure: {
                    gte: new Date(bookDeparture)
                }
            },
        })


        // 2 จองช่วง เวลา ระหว่าง เวลาที่เคยจองไปแล้วไม่ได้
        if (bookedBetweenDate) {
            return next(createError("Unable to reserve for this day", 400))
        }

        const bookedOffsetDate = await prisma.booking.findFirst({
            where: {
                roomId: +roomId,
                arrival: {
                    gte: new Date(bookArrival)
                },
                departure: {
                    lte: new Date(bookDeparture)
                }
            },
        })


        if (bookedOffsetDate) {
            return next(createError("Unable to reserve for this day", 400))
        }

        // 3 จองสำเร็จ
        const booking = await prisma.booking.create({
            data: { userId: req.user.id, arrival: new Date(bookArrival), departure: new Date(bookDeparture), roomId: +roomId }
        })

        res.status(200).json(booking);
    } catch (error) {
        next(error)
    }
}