const { SequencingType } = require('../models/index');

const create = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send({
            message: 'name required.',
        });
    }

    try {
        const seqt = await SequencingType.create({
            name,
        });
        return res.send(seqt);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const findAll = async (req, res) => {
    try {
        const seqt = await SequencingType.findAll();
        return res.send(seqt);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const seqt = await SequencingType.findByPk(id);

        if (!seqt) {
            return res.status(404).send({
                message: `Seqeuncing Type with id ${id} not found`,
            });
        }
        return res.send(seqt);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body; // just put name first, since thrs nth

    if (!name) {
        return res.status(400).send({
            message: 'New name required.',
        });
    }

    try {
        const seqt = await SequencingType.findByPk(id);

        if (!seqt) {
            return res.status(404).send({
                message: `Sequencing Type with id ${id} not found`,
            });
        }
        seqt.name = name;
        seqt.save();
        return res.send(seqt);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const seqt = await SequencingType.findByPk(id);

        if (!seqt) {
            return res.status(404).send({
                message: `Sequencing Type with id ${id} not found`,
            });
        }
        await seqt.destroy();
        return res.send(seqt);
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
