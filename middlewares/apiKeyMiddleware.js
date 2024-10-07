const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.header('Xpense-Key');

    if (!apiKey || apiKey !== process.env.API_KEY) {
        const error = new Error('Missing api key')
        error.statusCode = 401;
        next(error);
    }
    next()
};

module.exports = apiKeyMiddleware;
