const { Organism } = require('../models/index');

const create = async (req, res) => {
    const { name } = req.body;
    if (!(name)) {
        return res.status(400).send({
            message: 'name required.',
        });
    }

    try {
        const og = await Organism.create({
            name,
        });
        return res.send(og);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const findAll = async (req, res) => {
    try {
        const og = await Organism.findAll();
        return res.send(og);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const og = await Organism.findByPk(id);

        if (!og) {
            return res.status(404).send({
                message: `Organism with id ${id} not found`,
            });
        }
        return res.send(og);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).send({
            message: 'New name required.',
        });
    }

    try {
        const og = await Organism.findByPk(id);

        if (!og) {
            return res.status(404).send({
                message: `Organism with id ${id} not found`,
            });
        }
        og.name = name;
        og.save();
        return res.send(og);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const og = await Organism.findByPk(id);

        if (!og) {
            return res.status(404).send({
                message: `Organism with id ${id} not found`,
            });
        }
        await og.destroy();
        return res.send(og);
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
