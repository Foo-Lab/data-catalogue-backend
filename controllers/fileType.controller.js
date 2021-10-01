const { FileType } = require('../models/index');
const { catchAsync, AppError } = require('../utils');

const create = catchAsync(async (req, res) => {
    const { name } = req.body;

    const type = await FileType.create({
        name,
    });
    return res.send(type);
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

    const type = await FileType.findAll(options);
    const count = await FileType.count();

    return res
        .set({
            'Access-Control-Expose-Headers': 'X-total-count',
            'X-total-count': count,
        })
        .send(type);
});

const findOne = catchAsync(async (req, res) => {
    const { id } = req.params;

    const type = await FileType.findByPk(id);
    if (!type) {
        throw new AppError('File Type not found', 404);
    }
    return res.send(type);
});

const update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const type = await FileType.findByPk(id);
    if (!type) {
        throw new AppError('File Type not found', 404);
    }

    await type.update({
        name,
    });
    return res.send(type);
});

const remove = catchAsync(async (req, res) => {
    const { id } = req.params;

    const type = await FileType.findByPk(id);
    if (!type) {
        throw new AppError('File Type not found', 404);
    }

    await type.destroy();
    return res.send(type);
});

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
};
