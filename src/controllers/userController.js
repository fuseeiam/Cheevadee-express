const fs = require('fs/promises');

const createError = require('../utils/create_error');
const { upload } = require('../utils/cloudinary-service')
const prisma = require('../models/prisma');

// exports.updateProfile = async (req, res, next) => {
//     try {

//         if (!req.files) {
//             console.log(req.files);
//             return next(createError('profile image or cover image is required'))
//         }

//         const response = {};

//         if (req.files.profileImage) {
//             const url = await upload(req.files.profileImage[0].path);
//             response.profileImage = url;
//             await prisma.user.update({
//                 data: {
//                     profileImage: url
//                 },
//                 where: {
//                     id: req.user.id
//                 }
//             });

//         }

//     } catch (err) {
//         next(err);
//     } finally {
//         if (req.files.profileImage) {
//             fs.unlink(req.files.profileImage[0].path);
//         }
//     }
// };

exports.getUserProfileById = async (req, res, next) => {
    try {
        const profileData = await prisma.user.findUnique({
            where: {
                id: +req.params.userId,
            }
        });
        profileData.authUser = profileData.authUser[0];
        res.status(200).json({ profileData });
    } catch (err) {
        next(err);
    }
};


exports.updateProfile = async (req, res, next) => {
    try {
        console.log(req.body);

        if (req.file?.path) {
            const url = await upload(req.file.path);

            req.body.profileImage = url;
        }

        const updateProfile = await prisma.user.update({
            where: {
                id: +req.user.id,
            },
            data: req.body,
            include: {
                authUser: true,
            },
        });
        updateProfile.authUser = updateProfile.authUser[0];
        delete updateProfile.authUser.password;

        res.status(200).json({
            message: "Success update user profile /auth/editprofile",
            updateProfile,
        });
    } catch (err) {
        next(err);
    } finally {
        if (req.file) {
            fs.unlink(req.file.path);
        }
    }
};

exports.deleteBookingbyId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findBookingId = await prisma.bookingStatus.findFirst({
            where: {
                id: +id,
            },
        });
        if (!findCaseId) {
            return next(createError("Sorry do not have this item ID", 400));
        }
        await prisma.showCase.delete({
            where: {
                id: findCaseId.id,
            },
        });
        res.status(200).json({ Message: "Show case Id deleted" });
    } catch (error) {
        next(error);
    }
};