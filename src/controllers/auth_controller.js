const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema, adminLoginSchema } = require('../validators/auth-validator');
const prisma = require('../models/prisma');
const createError = require('../utils/create_error');


exports.register = async (req, res, next) => {
    try {
        const { value, error } = registerSchema.validate(req.body);
        console.log(value);
        if (error) {
            next(err)
        }
        value.password = await bcrypt.hash(value.password, 12);
        const user = await prisma.user.create({
            data: value
        });
        const payload = { userID: user.id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRETE_KEY || 'gajgajvajhvyfud', {
            expiresIn: process.env.JWT_EXPIRE
        });
        delete user.password;
        res.status(200).json({ accessToken, user });
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        console.log('req.body', req.body);
        const { value, error } = loginSchema.validate(req.body);
        if (error) {
            return next(error)
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: value.emailOrMobile }, { mobile: value.emailOrMobile }
                ]
            }
        });
        if (!user) {
            return next(createError('invalid credential', 400));
        }
        const isMatch = await bcrypt.compare(value.password, user.password);
        if (!isMatch) {
            return next(createError('invalid credential', 400))
        }
        const payload = { userID: user.id };
        console.log(process.env.JWT_SECRET_KEY);
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'gajgajvajhvyfud', {
            expiresIn: process.env.JWT_EXPIRE
        });
        delete user.password;
        res.status(200).json({ accessToken, user });

    } catch (err) {
        console.log(err);
        next(err)
    }
}

exports.adminLogin = async (req, res, next) => {
    try {
        const { value, error } = adminLoginSchema.validate(req.body);
        if (error) {
            return next(error)
        }
        const admin = await prisma.admin.findFirst({
            where: {
                OR: [
                    { email: value.email }
                ]
            }
        });
        if (!admin) {
            return next(createError('invalid credential', 400));
        }
        const isMatch = await bcrypt.compare(value.password, admin.password);
        if (!isMatch) {
            return next(createError('invalid credential', 400))
        }
        const payload = { userID: admin.id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRETE_KEY || 'cheevacheeva', {
            expiresIn: process.env.JWT_EXPIRE
        });
        delete admin.password;
        res.status(200).json({ accessToken, admin });

    } catch (err) {
        next(err)
    }
}

exports.getMe = async (req, res, next) => {
    // const userId = req.user.id
    // const {} = req.body

    // await prisma.create({
    //     userId,
    // })
    res.status(200).json({ user: req.user });
}