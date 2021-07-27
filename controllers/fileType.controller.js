const { FileType } = require('../models/index.js');


const create = async (req, res) => {
    const { name} = req.body;
    if (!name ) {
        return res.status(400).send({
            message: 'name required.'
        });
    }

    try {
        const ftype = await FileType.create({
            name
        });
        return res.send(ftype)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findAll = async (req, res) => {
    try {
        const ftype = await FileType.findAll();
        return res.send(ftype)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const ftype = await FileType.findByPk(id);

        if (!ftype) {
            return res.status(404).send({
                message: `File Type with id ${id} not found`
            });
        } else {
            return res.send(ftype);
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
        const ftype = await FileType.findByPk(id);

        if (!ftype) {
            return res.status(404).send({
                message: `File Type with id ${id} not found`
            });
        } else {
            ftype.name = name;
            ftype.save();
            return res.send(ftype);
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
        const ftype = await FileType.findByPk(id);

        if (!ftype) {
            return res.status(404).send({
                message: `File Type with id ${id} not found`
            });
        } else {
            await ftype.destroy();
            return res.send(ftype);
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