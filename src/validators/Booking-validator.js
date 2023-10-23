const Joi = require('joi');

const reservationSchema = () => {
    const now = new Date();
    const bookingSchema = Joi.object({
        bookArrival: Joi.date().min(
            new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
        ),
        bookDeparture: Joi.date().greater(Joi.ref('bookArrival')).iso(),
        roomId: Joi.number().required(),

    }).options({ allowUnknown: true });
    return bookingSchema;
};

exports.reservationSchema = reservationSchema;

// const reservationItemSchema = Joi.object({
//     bookAdult: Joi.number().required(),
//     bookChild: Joi.number().required()

// });
// exports.reservationItemSchema = reservationItemSchema;



