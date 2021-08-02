const { Experiment, User } = require('../models/index');

const create = async (req, res) => {
    const {
        userId,
        date,
        code,
        name,
        description,
    } = req.body;

    if (!(userId && date && code && name && description)) {
        return res.status(400).send({
            message: 'userId, date, code, name and description required.',
        });
    }

    try {
        const exp = await Experiment.create({
            userId,
            date,
            code,
            name,
            description,
        });
        return res.send(exp);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const findAll = async (req, res) => {
    const { userId } = req.params;

    try {
        const exp = await Experiment.findByPk(userId, {
            include: User,
        });

        if (!(exp && exp.userId)) {
            return res.status(404).send({
                message: `User with id ${userId} not found`,
            });
        }
        return res.send(exp.userId);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const exp = await Experiment.findByPk(id);

        if (!exp) {
            return res.status(404).send({
                message: `Experiment with id ${id} not found`,
            });
        }
        return res.send(exp);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { description } = req.body; // putting des first

    if (!description) {
        return res.status(400).send({
            message: 'New description required.',
        });
    }

    try {
        const exp = await Experiment.findByPk(id);

        if (!exp) {
            return res.status(404).send({
                message: `Experiment with id ${id} not found`,
            });
        }
        exp.description = description;
        exp.save();
        return res.send(exp);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const exp = await Experiment.findByPk(id);

        if (!exp) {
            return res.status(404).send({
                message: `Experiment with id ${id} not found`,
            });
        }
        await exp.destroy();
        return res.send(exp);
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
};
