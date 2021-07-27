const { Sample } = require('../models/index.js');

const create = async (req, res) => {
    const { experiment_id, user_id, status_id, date, code, name, organism_id, tissue, condition, treatment, sequencing_type_id, sequencer_id, sequencing_provider_id} = req.body;
    if (!(experiment_id && user_id && status_id && date && code && name && organism_id && tissue && condition && treatment && sequencing_type_id && sequencer_id && sequencing_provider_id)) {
        return res.status(400).send({
            message: 'experiment_id, user_id, status_id, date, code, name, organism_id, tissue, condition, treatment, sequencing_type_id, sequencer_id and sequencing_provider_id required.'
        });
    }

    try {
        const sam = await Sample.create({
            experiment_id, user_id, status_id, date, code, name, organism_id, tissue, condition, treatment, sequencing_type_id, sequencer_id, sequencing_provider_id
        });
        return res.send(sam)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findAll = async (req, res) => {
    try {
        const sam = await Sample.findAll();
        return res.send(sam)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const sam = await Sample.findByPk(id);

        if (!sam) {
            return res.status(404).send({
                message: `Sample with id ${id} not found`
            });
        } else {
            return res.send(sam);
        }
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { code } = req.body;

    if (!code) {
        return res.status(400).send({
            message: 'New code required.'
        });
    }

    try {
        const sam = await Sample.findByPk(id);

        if (!sam) {
            return res.status(404).send({
                message: `Sample with id ${id} not found`
            });
        } else {
            sam.code = code;
            sam.save();
            return res.send(sam);
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
        const sam = await Sample.findByPk(id);

        if (!sam) {
            return res.status(404).send({
                message: `Sample with id ${id} not found`
            });
        } else {
            await sam.destroy();
            return res.send(sam);
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