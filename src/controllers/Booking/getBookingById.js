const prisma = require('../../models/prisma');
const createError = require('../../utils/create_error');

exports.getBookingByID = async (req, res, next) => {
    try {
        const bookingDetails = await prisma.booking.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                },
                room: {
                    select: {
                        bed: true,
                        picture: true,
                        roomtype: true,
                        view: true,
                        price: true
                    }
                },

            },
        })
        res.status(200).json({ bookingDetails })
    } catch (error) {
        next(error)
    }
}
