const bcrypt = require('bcrypt');
const AppError = require('./errors/AppError');
const SequelizeError = require('./errors/SequelizeError');

/** `catchAsync` is a higher-order function that takes in a function `fn` as an 
 * argument, and returns a new function that takes in `req`, `res`, and `next` as 
 * arguments. This new function calls `fn` with `req`, `res`, and `next` as 
 * arguments and returns a promise. 
 * 
 * The sole argument of `catchAsync`, `fn`, should expect `req`, `res` and `next` as arguments. 
 * 
 * If the promise is rejected, it calls the `next` function with the error as an 
 * argument. This is a common pattern used in Express.js middleware to handle 
 * errors. 
 * */
const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);
const hashPassword = async (password, saltRounds) => bcrypt.hash(password, saltRounds);

module.exports = {
    AppError,
    SequelizeError,
    catchAsync,
    hashPassword,
};
