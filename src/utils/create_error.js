const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode
    console.log(error);
    return error;
}

module.exports = createError;
