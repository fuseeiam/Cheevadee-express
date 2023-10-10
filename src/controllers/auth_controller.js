const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validators/auth-validator');
const prisma = require('../models/prisma');


exports.register = async (req, res, next) => {
    try {
        const { value, error } = registerSchema.validate(req.body);
        console.log(value);
        if (error) {
            console.log(error);
        }
        value.password = await bcrypt.hash(value.password, 12);
        const user = await prisma.user.create({
            data: value
        });
        const payload = { userID: user.id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRETE_KEY || 'gajgajvajhvyfud', {
            expiresIn: process.env.JWT_EXPIRE
        })
        res.status(200).json({ accessToken, user });
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}