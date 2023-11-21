const cloudinary = require('../config/cloudinary');

module.exports.upload = async path => {
    const result = await cloudinary.uploader.upload(path)
    return result.secure_url;
};