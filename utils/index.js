const AppError = require('./errors/AppError');
const SequelizeError = require('./errors/SequelizeError');

const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

module.exports = {
    AppError,
    SequelizeError,
    catchAsync,
};
