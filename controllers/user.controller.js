const { User } = require('../models/index');
const { catchAsync, AppError, hashPassword } = require('../utils');

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
    const user = await User.findByPk(id);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    if (req.body.isAdmin !== null) {
        // manual update with postman
        const {
            name,
            username,
            email,
            password,
            isAdmin,
        } = req.body;
        const data = {
                name,
                username,
                email,
                password: await hashPassword(password, user.salt),
                isAdmin,
            };
        await user.update(data);
    } else {
        // update from website
        const {
            name,
            username,
            email,
            currentPassword,
            newPassword,
        } = req.body;
        const isAdmin = user.isAdmin;
        // if currentPassword is correct, allow update. else throw 401 error
        if (!user.validatePassword(currentPassword)) {
            throw new AppError('Incorrect password', 401);
        }
        const data = {
            name,
            username,
            email,
            password: hashPassword(newPassword, user.salt),
            isAdmin,
        };
        await user.update(data);
    }
    
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
