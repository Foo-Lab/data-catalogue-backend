const { User } = require('../models/index');
const { catchAsync, AppError } = require('../utils');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefresh = catchAsync(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) throw new AppError('refreshToken not found', 401) // refreshToken not found

    const refreshToken = cookies.jwt;
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) throw new AppError('forbidden', 403) // forbidden
            const { username } = decoded;
            const user = User.findOne({
                where: { username },
            });
            if (!(user)) throw new AppError('forbidden', 403); // token username does not exists        

            const accessToken = jwt.sign(
                { username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15min' },
            );

            const { isAdmin, id, name, email } = user;
            res.json({ id, name, username, email, isAdmin, 'token': accessToken });
        },
    )
});


module.exports = { handleRefresh };
