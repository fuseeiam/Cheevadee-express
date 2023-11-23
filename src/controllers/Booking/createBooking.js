const prisma = require('../../models/prisma');
const { upload } = require('../../utils/cloudinary-service');
const createError = require('../../utils/create_error');
const { bookingSchema } = require('../../validators/Booking-validator');
const fs = require('fs/promises')

exports.createBooking = async (req, res, next) => {


    try {
        const data = req.body;
        console.log(data, "datatatta");
        const { value, error } = bookingSchema.validate(data);
        const { arrival, departure, roomId, total_price } = value
        if (error) {
            return next(error)
        }
        // 1 จองช่วง เวลา ที่เคยจองไปแล้ว ไม่ได้
        const bookedBetweenDate = await prisma.booking.findFirst({
            where: {
                roomId: +roomId,
                arrival: {
                    lte: new Date(arrival)
                },
                departure: {
                    gte: new Date(departure)
                }
            },
        })
        console.log("bookedBetweenDate", bookedBetweenDate);

        // // 2 จองช่วง เวลา ระหว่าง เวลาที่เคยจองไปแล้วไม่ได้
        if (bookedBetweenDate) {
            return next(createError("Room is already booked for those dates.", 400))
        }

        // Slip image
        let paymentSlip = ""
        if (req.file) {
            console.log(req.file, "filEEEEEE");
            const data = await upload(req.file.path);
            paymentSlip = data
        }

        // 4 จองสำเร็จ
        const booking = await prisma.booking.create({
            data: {
                userId: req.user.id,
                arrival: new Date(arrival),
                departure: new Date(departure),
                roomId: +roomId,
                paymentSlip: paymentSlip,
                total_price: +total_price
            }
        })
        console.log(booking, "AAA");
        res.status(201).json({ booking })

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




    } catch (error) {
        next(error)
    } finally {
        if (req.file) {
            fs.unlink(req.file.path)
        }
    }
}
