const createError = require("../utils/create_error");
const jwt = require('jsonwebtoken');
const prisma = require('../models/prisma');

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWish('Bearer ')) {
            return next(createError('unauthenicated', 401));
        }
        const token = authorization.split('Bearer ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'hotelcmth');

        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId
            }
        })
        if (!user) {
            return next(createError('unauthenicated', 401));
        }

        delete user.password;
        req.user = user;
        next();

    } catch (err) {
        if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
            err.statusCode = 401;
        }
        next(err);

    }
};