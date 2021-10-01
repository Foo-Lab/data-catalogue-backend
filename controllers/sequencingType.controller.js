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
    const { page, size } = req.query;

    let options = {};
    if (page && size) {
        options = {
            offset: ((page - 1) * size),
            limit: parseInt(size, 10),
        };
    }

    const seqType = await SequencingType.findAll(options);
    const count = await SequencingType.count();

    return res
        .set({
            'Access-Control-Expose-Headers': 'X-total-count',
            'X-total-count': count,
        })
        .send(seqType);
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
