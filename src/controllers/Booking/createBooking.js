exports.createBooking = async (req, res, next) => {
    try {
        const user = res.user
        const { arrival, departure, paymentSlip, paymentStatus, roomId } = req.body
        const booking = await prisma.booking.create({
            data: { userId: user.id, arrival, departure, paymentSlip, paymentStatus, roomId }
        })
        if (error) {
            return next(error)
        }
    } catch (err) {
        next(err)
    }
}