const { SampleFile } = require('../models/index.js');

const create = async (req, res) => {
    const { sample_id, file_type_id, location, remarks } = req.body;
    if (!(sample_id && file_type_id && location && remarks )) {
        return res.status(400).send({
            message: 'sample_id, file_type_id, location, remarks required.'
        });
    }

    try {
        const sf = await SampleFile.create({
            sample_id, file_type_id, location, remarks
        });
        return res.send(sf)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findAll = async (req, res) => {
    try {
        const sf = await SampleFile.findAll();
        return res.send(sf)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const sf = await SampleFile.findByPk(id);

        if (!sf) {
            return res.status(404).send({
                message: `Sample File with id ${id} not found`
            });
        } else {
            return res.send(sf);
        }
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { location } = req.body;

    if (!location) {
        return res.status(400).send({
            message: 'New location required.'
        });
    }

    try {
        const sf = await SampleFile.findByPk(id);

        if (!sf) {
            return res.status(404).send({
                message: `Sample File with id ${id} not found`
            });
        } else {
            sf.location = location;
            sf.save();
            return res.send(sf);
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
        const sf = await SampleFile.findByPk(id);

        if (!sf) {
            return res.status(404).send({
                message: `Sample File with id ${id} not found`
            });
        } else {
            await sf.destroy();
            return res.send(sf);
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