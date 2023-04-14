const jwt = require('jsonwebtoken');
const AppError = require('./errors/AppError');
require('dotenv').config();

const verifyAccessToken = (req, res, next) => {
    const headers = req.headers;
    if (!headers['authorization']) {
        throw new AppError(`no auth header: ${headers['authorization']}`, 401); // unauthorized
    }
    const token = headers['authorization'].split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) throw new AppError(`token invalid, ${err}`, 403) // invalid token
            next();
        }
    );
};

module.exports = verifyAccessToken;
