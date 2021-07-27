const { Status } = require('../models/index.js');


const create = async (req, res) => {
    const { name} = req.body;
    if (!(name )) {
        return res.status(400).send({
            message: 'name required.'
        });
    }

    try {
        const st = await Status.create({
            name
        });
        return res.send(st)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findAll = async (req, res) => {
    try {
        const st = await Status.findAll();
        return res.send(st)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const st = await Status.findByPk(id);

        if (!st) {
            return res.status(404).send({
                message: `Status with id ${id} not found`
            });
        } else {
            return res.send(st);
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
        const st = await Status.findByPk(id);

        if (!st) {
            return res.status(404).send({
                message: `Status with id ${id} not found`
            });
        } else {
            st.name = name;
            st.save();
            return res.send(st);
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
        const st = await Status.findByPk(id);

        if (!st) {
            return res.status(404).send({
                message: `Status with id ${id} not found`
            });
        } else {
            await st.destroy();
            return res.send(st);
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