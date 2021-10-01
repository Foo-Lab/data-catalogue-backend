const { User } = require('../models/index');
const { catchAsync, AppError } = require('../utils');

const create = catchAsync(async (req, res) => {
    const {
        name,
        username,
        email,
        password,
    } = req.body;

    const user = await User.create({
        name,
        username,
        email,
        password,
    });
    return res.send(user);
});

const findAll = catchAsync(async (req, res) => {
    const user = await User.findAll();
    return res.send(user);
});

const findOne = catchAsync(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    return res.send(user);
});

const update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const {
        name,
        username,
        email,
        password,
    } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    await user.update({
        name,
        username,
        email,
        password,
    });
    return res.send(user);
});

const remove = catchAsync(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    await user.destroy();
    return res.send(user);
});

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

    return res.send(user);
});

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
    login,
};
