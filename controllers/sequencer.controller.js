const { Sequencer } = require('../models/index');
const { catchAsync, AppError } = require('../utils');

const create = catchAsync(async (req, res) => {
    const { name } = req.body;

    const seq = await Sequencer.create({
        name,
    });
    return res.send(seq);
});

const findAll = catchAsync(async (req, res) => {
    const seq = await Sequencer.findAll();
    return res.send(seq);
});

const findOne = catchAsync(async (req, res) => {
    const { id } = req.params;

    const seq = await Sequencer.findByPk(id);
    if (!seq) {
        throw new AppError('Sequencer not found', 404);
    }
    return res.send(seq);
});

const update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const seq = await Sequencer.findByPk(id);
    if (!seq) {
        throw new AppError('Sequencer not found', 404);
    }

    await seq.update({
        name,
    });
    return res.send(seq);
});

const remove = catchAsync(async (req, res) => {
    const { id } = req.params;

    const seq = await Sequencer.findByPk(id);
    if (!seq) {
        throw new AppError('Sequencer not found', 404);
    }

    await seq.destroy();
    return res.send(seq);
});

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
};
