const { SequencingProvider } = require('../models/index');
const { catchAsync, AppError } = require('../utils');

const create = catchAsync(async (req, res) => {
    const { name } = req.body;

    const seqProvider = await SequencingProvider.create({
        name,
    });
    return res.send(seqProvider);
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

    const seqProvider = await SequencingProvider.findAll(options);
    const count = await SequencingProvider.count();

    return res
        .set({
            'Access-Control-Expose-Headers': 'X-total-count',
            'X-total-count': count,
        })
        .send(seqProvider);
});

const findOne = catchAsync(async (req, res) => {
    const { id } = req.params;

    const seqProvider = await SequencingProvider.findByPk(id);
    if (!seqProvider) {
        throw new AppError('Sequencing Provider not found', 404);
    }
    return res.send(seqProvider);
});

const update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const seqProvider = await SequencingProvider.findByPk(id);
    if (!seqProvider) {
        throw new AppError('Sequencing Provider not found', 404);
    }

    await seqProvider.update({
        name,
    });
    return res.send(seqProvider);
});

const remove = catchAsync(async (req, res) => {
    const { id } = req.params;

    const seqProvider = await SequencingProvider.findByPk(id);
    if (!seqProvider) {
        throw new AppError('Sequencing Provider not found', 404);
    }

    await seqProvider.destroy();
    return res.send(seqProvider);
});

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
};
