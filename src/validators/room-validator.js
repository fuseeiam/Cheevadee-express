const Joi = require('joi');

const checkRoomIdSchema = Joi.object({
    roomId: Joi.number().integer().positive().required()
});

exports.checkRoomIdSchema = checkRoomIdSchema