const { User } = require('../models/index');
const { catchAsync, AppError } = require('../utils');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = catchAsync(async (req, res) => {
    const { username, password } = req.body;

    if (!(username && password)) {
        throw new AppError('Username and Password are required', 400);
    }

    const user = await User.findOne({
        where: { username },
    });
    if (!(user && user.validatePassword(password))) {
        throw new AppError('Incorrect username or password', 401);
    }

    // instead of returning user, should send JSON web token
    const accessToken = jwt.sign(
        { 'username': user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15min' }
    );

    const refreshToken = jwt.sign(
        { 'username': user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    const { isAdmin, id, name, email } = user;
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ id, name, username, email, isAdmin, 'token': accessToken });
    // return res.send(user);
    return
});

module.exports = { login };
