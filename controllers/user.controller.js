const { User } = require('../models/index');
const { hashPassword } = require('../utilities');

const create = async (req, res) => {
    const {
        name, username, email, password, isAdmin,
    } = req.body;
    if (!(name && username && email && password && isAdmin)) {
        return res.status(400).send({
            message: 'name, username, email, password, is_admin required.',
        });
    }

    try {
        const usr = await User.create({
            name, username, email, password, isAdmin,
        });
        return res.send(usr);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const findAll = async (req, res) => {
    try {
        const usr = await User.findAll();
        return res.send(usr);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const usr = await User.findByPk(id);

        if (!usr) {
            return res.status(404).send({
                message: `User with id ${id} not found`,
            });
        }
        return res.send(usr);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!(name)) {
        return res.status(400).send({
            message: 'New name required.',
        });
    }

    try {
        const usr = await User.findByPk(id);

        if (!usr) {
            return res.status(404).send({
                message: `User with id ${id} not found`,
            });
        }
        usr.name = name;
        usr.save();
        return res.send(usr);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const usr = await User.findByPk(id);

        if (!usr) {
            return res.status(404).send({
                message: `User with id ${id} not found`,
            });
        }
        await usr.destroy();
        return res.send(usr);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!(username && password)) {
        return res.status(400).send({
            message: 'Username and password are required.',
        });
    }

    try {
        const user = await User.findOne({
            where: {
                username,
            },
        });
        if (!user) {
            return res.status(404).send({
                message: `User with username ${username} not found`,
            });
        }
        const genHash = await hashPassword(password, user.salt);
        if (genHash === user.password) {
            return res.send('login successful');
        }
        return res.status(404).send({
            message: 'Username or Password is wrong',
        });
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
    login,
};
