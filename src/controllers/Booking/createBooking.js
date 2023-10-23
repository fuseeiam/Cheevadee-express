const prisma = require('../../models/prisma');
const createError = require('../../utils/create_error');
const reservationSchema = require('../../validators/Booking-validator');

exports.createBooking = async (req, res, next) => {
    // 1 จองช่วง เวลา ที่เคยจองไปแล้ว ไม่ได้
    try {
        const { bookArrival, bookDeparture, paymentSlip, paymentStatus, roomId } = reservationSchema().validate(req.body);
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
            return next(createError("Room is already booked for those dates.", 400))
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

        // 3 จองช่วง เวลา ระหว่าง เวลาที่เคยจองไปแล้วไม่ได้
        if (bookedOffsetDate) {
            return next(createError("Room is already booked for those dates.", 400))
        }


        // 4 จองสำเร็จ
        const booking = await prisma.booking.create({
            data: { userId: req.user.id, arrival: new Date(bookArrival), departure: new Date(bookDeparture), roomId: +roomId }
        })

        // 5 ห้องกำลังทำความสะอาด ปรับปรุง
        const isMaintaining = await isRoomMaintaining(value);
        if (isMaintaining) {
            return next(createError('Room is under maintenance.', 400));
        }

        // Admin 
        const isRoomMaintaining = async (value) => {
            const room = await prisma.room.findFirst({
                where: {
                    id: value.roomId
                }
            });
            return room.isMaintaining;
        }


        res.status(200).json(booking);
    } catch (error) {
        next(error)
    }
}