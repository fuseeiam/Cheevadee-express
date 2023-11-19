const Joi = require('joi');

const bookingSchema = Joi.object({
    bookArrival: Joi.date().min(
        new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
    ),
    bookDeparture: Joi.date().greater(Joi.ref('bookArrival')).iso(),
    roomId: Joi.number().required(),
    paymentSlip: Joi.string(),
    total_price: Joi.number().required()


});

exports.bookingSchema = bookingSchema;

// const reservationItemSchema = Joi.object({
//     bookAdult: Joi.number().required(),
//     bookChild: Joi.number().required()

// });
// exports.reservationItemSchema = reservationItemSchema;



