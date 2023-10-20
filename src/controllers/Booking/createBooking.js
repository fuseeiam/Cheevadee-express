const prisma = require('../../models/prisma');
const createError = require('../../utils/create_error');

exports.createBooking = async (req, res, next) => {
    try {
        const { bookArrival, bookDeparture, paymentSlip, paymentStatus, roomId } = req.body





        const bookedBetweenDate = await prisma.booking.findFirst({
            where: {
                room_id: +roomId,
                arrival: {
                    lte: new Date(bookArrival)
                },
                departure: {
                    gte: new Date(bookDeparture)
                }

            },
            // 1 จองช่วง เวลา ที่เคยจองไปแล้ว ไม่ได้
            // 2 จองช่วง เวลา รหว่าง เวลาที่เคยจองไปแล้วไม่ได้
        })



        if (bookedBetweenDate) {
            return next(createError("Can't book for this day", 400))
        }

        const bookedOffsetDate = await prisma.booking.findFirst({
            where: {
                room_id: +roomId,
                arrival: {
                    gte: new Date(bookArrival)
                },
                departure: {
                    lte: new Date(bookDeparture)
                }

            },

        })

        if (bookedOffsetDate) {
            return next(createError("Can't book for this day", 400))
        }



        // const booked = await prisma.$queryRaw`SELECT * FROM booking WHERE room_id = ${roomId} and arrival NOT BETWEEN ${arrival} AND ${departure} and departure NOT BETWEEN ${arrival} AND ${departure}`

        // console.log("--------------------------", booked);

        // if (booked) {
        //     return next(createError("Can't book for this day", 400))
        // }

        const booking = await prisma.booking.create({
            data: { userId: req.user.id, arrival: new Date(arrival), departure: new Date(departure), room_id: +roomId }
        })

        res.status(200).json(booking)
    } catch (error) {
        next(error)
    }
}