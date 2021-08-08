const { SequencingType } = require('../models/index');
const { catchAsync, AppError } = require('../utils');

const create = catchAsync(async (req, res) => {
    const { name } = req.body;

    const seqType = await SequencingType.create({
        name,
    });
    return res.send(seqType);
});

const findAll = catchAsync(async (req, res) => {
    const seqType = await SequencingType.findAll();
    return res.send(seqType);
});

const findOne = catchAsync(async (req, res) => {
    const { id } = req.params;

    const seqType = await SequencingType.findByPk(id);
    if (!seqType) {
        throw new AppError('Sequencing Type not found', 404);
    }
    return res.send(seqType);
});

const update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const seqType = await SequencingType.findByPk(id);
    if (!seqType) {
        throw new AppError('Sequencing Type not found', 404);
    }

    await seqType.update({
        name,
    });
    return res.send(seqType);
});

const remove = catchAsync(async (req, res) => {
    const { id } = req.params;

    const seqType = await SequencingType.findByPk(id);
    if (!seqType) {
        throw new AppError('Sequencing Type not found', 404);
    }

    await seqType.destroy();
    return res.send(seqType);
});

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
};
