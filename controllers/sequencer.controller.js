const { Sequencer } = require('../models/index.js');


const create = async (req, res) => {
    const { name} = req.body;
    if (!name ) {
        return res.status(400).send({
            message: 'name required.'
        });
    }

    try {
        const seq = await Sequencer.create({
            name
        });
        return res.send(seq)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findAll = async (req, res) => {
    try {
        const seq = await Sequencer.findAll();
        return res.send(seq)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const seq = await Sequencer.findByPk(id);

        if (!seq) {
            return res.status(404).send({
                message: `Sequencer with id ${id} not found`
            });
        } else {
            return res.send(seq);
        }
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const update = async (req, res) => { 

    const { id } = req.params;
    const { name } = req.body; //just put name first, since thrs nth

    if (!name) {
        return res.status(400).send({
            message: 'New name required.'
        });
    }

    try {
        const seq = await Sequencer.findByPk(id);

        if (!seq) {
            return res.status(404).send({
                message: `Sequencer with id ${id} not found`
            });
        } else {
            seq.name = name;
            seq.save();
            return res.send(seq);
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
        const seq = await Sequencer.findByPk(id);

        if (!seq) {
            return res.status(404).send({
                message: `Sequencer with id ${id} not found`
            });
        } else {
            await seq.destroy();
            return res.send(seq);
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