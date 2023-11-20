const Joi = require('joi');

const bookingSchema = Joi.object({
    arrival: Joi.date().min(
        new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
    ),
    departure: Joi.date().greater(Joi.ref('arrival')),
    roomId: Joi.string().required(),
    total_price: Joi.number().required()


});

exports.bookingSchema = bookingSchema;

// const reservationItemSchema = Joi.object({
//     bookAdult: Joi.number().required(),
//     bookChild: Joi.number().required()

// });
// exports.reservationItemSchema = reservationItemSchema;



