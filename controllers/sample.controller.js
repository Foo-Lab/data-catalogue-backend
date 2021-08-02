const { Sample } = require('../models/index');

const create = async (req, res) => {
    const {
        experimentId,
        userId,
        statusId,
        date, code,
        name,
        organismId,
        tissue,
        condition,
        treatment,
        sequencingTypeId,
        sequencerId,
        sequencingProviderId,
    } = req.body;
    if (!(
        experimentId
        && userId
        && statusId
        && date
        && code
        && name
        && organismId
        && tissue
        && condition
        && treatment
        && sequencing_typeId
        && sequencerId
        && sequencing_providerId
    )) {
        return res.status(400).send({
            message: 'experimentId, userId, statusId, date, code, name, organismId, tissue, condition, treatment, sequencing_typeId, sequencerId and sequencing_providerId required.',
        });
    }

    try {
        const sam = await Sample.create({
            experimentId,
            userId,
            statusId,
            date,
            code,
            name,
            organismId,
            tissue,
            condition,
            treatment,
            sequencingTypeId,
            sequencerId,
            sequencingProviderId,
        });
        return res.send(sam);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const findAll = async (req, res) => {
    try {
        const sam = await Sample.findAll();
        return res.send(sam);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const sam = await Sample.findByPk(id);

        if (!sam) {
            return res.status(404).send({
                message: `Sample with id ${id} not found`,
            });
        }
        return res.send(sam);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { code } = req.body;

    if (!code) {
        return res.status(400).send({
            message: 'New code required.',
        });
    }

    try {
        const sam = await Sample.findByPk(id);

        if (!sam) {
            return res.status(404).send({
                message: `Sample with id ${id} not found`,
            });
        }
        sam.code = code;
        sam.save();
        return res.send(sam);
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`,
        });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const sam = await Sample.findByPk(id);

        if (!sam) {
            return res.status(404).send({
                message: `Sample with id ${id} not found`,
            });
        }
        await sam.destroy();
        return res.send(sam);
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
