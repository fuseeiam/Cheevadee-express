const { upload } = require('../../utils/cloudinary-service');
const prisma = require('../../models/prisma');

exports.createPostSlip = async (req, res, next) => {
    try {

        console.log('req', req.body);
        const data = { userId: req.booking.id };
        if (req.file) {
            data.image = await upload(req.booking.path);
        }

        const post = await prisma.post.create({
            data: data,
            include: {
                user: {
                    select: {
                        id: true,
                        // firstName: true,
                        // lastName: true,
                        paymentSlip: true
                    }
                }
            }
        });

        res.status(201).json({ message: 'post created', post });

    } catch (err) {
        next(err);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const { value, error } = checkPostIdSchema.validate(req.params);
        if (error) {
            return next(error);
        }

        const existPost = await prisma.post.findFirst({
            where: {
                id: value.postId,
                userId: req.user.id
            }
        });

        if (!existPost) {
            return next(createError('cannot delete this post', 400));
        }
        await prisma.post.delete({
            where: {
                id: existPost.id
            }
        });
        res.status(200).json({ message: 'delete' });

    } catch (err) {
        next(err);
    }
}