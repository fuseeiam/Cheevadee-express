const prisma = require('../../models/prisma');
const { upload } = require('../../utils/cloudinary-service');
const createError = require('../../utils/create_error');
const { bookingSchema } = require('../../validators/Booking-validator');

exports.createBooking = async (req, res, next) => {


    try {

        const data = JSON.parse(req.body.data);
        console.log(data.total_price, "aass");
        const { value, error } = bookingSchema.validate(data);
        const { bookArrival, bookDeparture, paymentStatus, roomId, total_price } = value
        if (error) {
            next(error)
        }
        // 1 จองช่วง เวลา ที่เคยจองไปแล้ว ไม่ได้
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
        console.log("bookedBetweenDate", bookedBetweenDate);

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
        if (bookedOffsetDate) {
            return next(createError("Room is already booked for those dates.", 400))
        }

        // Slip image
        let paymentSlip = ""
        if (req.file) {
            const data = await upload(req.file.path);
            paymentSlip = data
        }

        // 4 จองสำเร็จ
        const booking = await prisma.booking.create({

            data: { userId: req.user.id, arrival: new Date(bookArrival), departure: new Date(bookDeparture), roomId: +roomId, paymentSlip: paymentSlip, total_price: total_price }
        })

        // // Admin 
        // const isRoomMaintaining = async (value) => {
        //     const room = await prisma.room.findFirst({
        //         where: {
        //             id: value.roomId
        //         }
        //     });
        //     return room.isMaintaining;
        // }

        // // 5 ห้องกำลังทำความสะอาด ปรับปรุง
        // const isMaintaining = await isRoomMaintaining(value);
        // if (isMaintaining) {
        //     return next(createError('Room is under maintenance.', 400));
        // }



        res.status(200).json(booking);
    } catch (error) {
        next(error)
    }
}
