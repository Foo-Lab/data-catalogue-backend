const { Status } = require('../models/index');
const { catchAsync, AppError } = require('../utils');

const create = catchAsync(async (req, res) => {
    const { name } = req.body;

    const status = await Status.create({
        name,
    });
    return res.send(status);
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

    const status = await Status.findAll(options);
    const count = await Status.count();

    return res
        .set({
            'Access-Control-Expose-Headers': 'X-total-count',
            'X-total-count': count,
        })
        .send(status);
});

const findOne = catchAsync(async (req, res) => {
    const { id } = req.params;

    const status = await Status.findByPk(id);
    if (!status) {
        throw new AppError('Status not found', 404);
    }
    return res.send(status);
});

const update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const status = await Status.findByPk(id);
    if (!status) {
        throw new AppError('Status not found', 404);
    }

    await status.update({
        name,
    });
    return res.send(status);
});

const remove = catchAsync(async (req, res) => {
    const { id } = req.params;

    const status = await Status.findByPk(id);
    if (!status) {
        throw new AppError('Status not found', 404);
    }

    await status.destroy();
    return res.send(status);
});

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
};
