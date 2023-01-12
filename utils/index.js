const bcrypt = require('bcrypt');
const AppError = require('./errors/AppError');
const SequelizeError = require('./errors/SequelizeError');

const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);
const generatePassword = async (password, saltRounds) => bcrypt.hash(password, saltRounds);

module.exports = {
    AppError,
    SequelizeError,
    catchAsync,
    generatePassword,
};
