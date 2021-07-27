const { 
    Experiment,
    User } = require('../models/index.js');


const create = async (req, res) => {
    const { user_id, date, code, name, description} = req.body;

    if (!(user_id && date && code && name && description)) {
        return res.status(400).send({
            message: 'user_id, date, code, name and description required.'
        });
    }

    try {
        const exp = await Experiment.create({
            user_id, date, code, name, description
        });
        return res.send(exp)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findAll = async (req, res) => {
    const { user_id } = req.params;

    try {
        const exp = await Experiment.findByPk(user_id, {
            include: User
        });

        if (!(exp && exp['user_id'])){
            return res.status(404).send({
                message : 'User with id ${user_id} not found'
            });
        } else{
            return res.send(exp['user_id']);
        }
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const exp = await Experiment.findByPk(id);

        if (!exp) {
            return res.status(404).send({
                message: `Experiment with id ${id} not found`
            });
        } else {
            return res.send(exp);
        }
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const update = async (req, res) => { 

    const { id } = req.params;
    const { description } = req.body; //putting des first

    if (!description) {
        return res.status(400).send({
            message: 'New description required.'
        });
    }

    try {
        const exp = await Experiment.findByPk(id);

        if (!exp) {
            return res.status(404).send({
                message: `Experiment with id ${id} not found`
            });
        } else {
            exp.description = description;
            exp.save();
            return res.send(exp);
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
        const exp = await Experiment.findByPk(id);

        if (!exp) {
            return res.status(404).send({
                message: `Experiment with id ${id} not found`
            });
        } else {
            await exp.destroy();
            return res.send(exp);
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