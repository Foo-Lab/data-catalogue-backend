const { Experiment, User } = require('../models/index');
const { catchAsync, AppError } = require('../utils');

const create = catchAsync(async (req, res) => {
    const {
        userId,
        date,
        code,
        name,
        description,
    } = req.body;

    const exp = await Experiment.create({
        userId,
        date,
        code,
        name,
        description,
    });
    return res.send(exp);
});

const findAll = catchAsync(async (req, res) => {
    const {
        page, size, sort, dir,
    } = req.query;

    let options = {};
    if (page && size) {
        options = {
            ...options,
            offset: ((page - 1) * size),
            limit: parseInt(size, 10),
        };
    }
    if (sort && dir) {
        options = {
            ...options,
            order:
                sort.includes('.')
                    ? [[sort.split('.')[0], sort.split('.')[1], dir]]
                    : [[sort, dir]],
        };
    }

    const exp = await Experiment.findAll({
        include: User,
        ...options,
    });
    const count = await Experiment.count();

    return res
        .set({
            'Access-Control-Expose-Headers': 'X-total-count',
            'X-total-count': count,
        })
        .send(exp);
});

const findOne = catchAsync(async (req, res) => {
    const { id } = req.params;

    const exp = await Experiment.findByPk(id, {
        include: User,
    });
    if (!exp) {
        throw new AppError('Experiment not found', 404);
    }
    return res.send(exp);
});

const update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const {
        userId,
        date,
        code,
        name,
        description,
    } = req.body;

    const exp = await Experiment.findByPk(id);
    if (!exp) {
        throw new AppError('Experiment not found', 404);
    }

    await exp.update({
        userId,
        date,
        code,
        name,
        description,
    });
    return res.send(exp);
});

const remove = catchAsync(async (req, res) => {
    const { id } = req.params;

    const exp = await Experiment.findByPk(id);
    if (!exp) {
        throw new AppError('Experiment not found', 404);
    }

    await exp.destroy();
    return res.send(exp);
});

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
};
