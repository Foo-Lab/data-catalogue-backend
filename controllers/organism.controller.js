const { Organism } = require('../models/index');
const { catchAsync, AppError } = require('../utils');

const create = catchAsync(async (req, res) => {
    const { name } = req.body;

    const organism = await Organism.create({
        name,
    });
    return res.send(organism);
});

const findAll = catchAsync(async (req, res) => {
    const organism = await Organism.findAll();
    return res.send(organism);
});

const findOne = catchAsync(async (req, res) => {
    const { id } = req.params;

    const organism = await Organism.findByPk(id);
    if (!organism) {
        throw new AppError('Organism not found', 404);
    }
    return res.send(organism);
});

const update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const organism = await Organism.findByPk(id);
    if (!organism) {
        throw new AppError('Organism not found', 404);
    }

    await organism.update({
        name,
    });
    return res.send(organism);
});

const remove = catchAsync(async (req, res) => {
    const { id } = req.params;

    const organism = await Organism.findByPk(id);
    if (!organism) {
        throw new AppError('Organism not found', 404);
    }

    await organism.destroy();
    return res.send(organism);
});

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
};
