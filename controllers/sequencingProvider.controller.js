const { SequencingProvider } = require('../models/index');

const create = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send({
            message: 'name required.',
        });
    }

    try {
        const seqp = await SequencingProvider.create({
            name,
        });
        return res.send(seqp);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const findAll = async (req, res) => {
    try {
        const seqp = await SequencingProvider.findAll();
        return res.send(seqp);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const seqp = await SequencingProvider.findByPk(id);

        if (!seqp) {
            return res.status(404).send({
                message: `Sequencing Provider with id ${id} not found`,
            });
        }
        return res.send(seqp);
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
        const seqp = await SequencingProvider.findByPk(id);

        if (!seqp) {
            return res.status(404).send({
                message: `Sequencing Provider with id ${id} not found`,
            });
        }
        seqp.name = name;
        seqp.save();
        return res.send(seqp);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const seqp = await SequencingProvider.findByPk(id);

        if (!seqp) {
            return res.status(404).send({
                message: `Sequencing Provider with id ${id} not found`,
            });
        }
        await seqp.destroy();
        return res.send(seqp);
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
