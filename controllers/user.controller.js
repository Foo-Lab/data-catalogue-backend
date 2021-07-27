const { User } = require('../models/index.js');

const create = async (req, res) => {
    const { name, username, email, salt, hash, is_admin } = req.body;
    if (!(name && username && email && salt && hash && is_admin )) {
        return res.status(400).send({
            message: 'name, username, email, salt, hash, is_admin required.'
        });
    }

    try {
        const usr = await User.create({
            name, username, email, salt, hash, is_admin
        });
        return res.send(usr)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findAll = async (req, res) => {
    try {
        const usr = await User.findAll();
        return res.send(usr)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const usr = await User.findByPk(id);

        if (!usr) {
            return res.status(404).send({
                message: `User with id ${id} not found`
            });
        } else {
            return res.send(usr);
        }
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { salt, hash } = req.body;

    if (! (salt && hash)) {
        return res.status(400).send({
            message: 'New salt and hash required.'
        });
    }

    try {
        const usr = await User.findByPk(id);

        if (!usr) {
            return res.status(404).send({
                message: `User with id ${id} not found`
            });
        } else {
            usr.salt = salt;
            usr.hash - hash;
            usr.save();
            return res.send(usr);
        }
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const usr = await User.findByPk(id);

        if (!usr) {
            return res.status(404).send({
                message: `User with id ${id} not found`
            });
        } else {
            await usr.destroy();
            return res.send(usr);
        }
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
}