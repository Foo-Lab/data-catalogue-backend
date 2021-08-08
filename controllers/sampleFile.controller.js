const { SampleFile } = require('../models/index');
const { catchAsync, AppError } = require('../utils');

const create = catchAsync(async (req, res) => {
    const {
        sampleId,
        fileTypeId,
        location,
        remarks,
    } = req.body;

    const file = await SampleFile.create({
        sampleId,
        fileTypeId,
        location,
        remarks,
    });
    return res.send(file);
});

const findAll = catchAsync(async (req, res) => {
    const file = await SampleFile.findAll();
    return res.send(file);
});

const findOne = catchAsync(async (req, res) => {
    const { id } = req.params;

    const file = await SampleFile.findByPk(id);
    if (!file) {
        throw new AppError('Sample File not found', 404);
    }
    return res.send(file);
});

const update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const {
        sampleId,
        fileTypeId,
        location,
        remarks,
    } = req.body;

    const file = await SampleFile.findByPk(id);
    if (!file) {
        throw new AppError('Sample File not found', 404);
    }

    await file.update({
        sampleId,
        fileTypeId,
        location,
        remarks,
    });
    return res.send(file);
});

const remove = catchAsync(async (req, res) => {
    const { id } = req.params;

    const file = await SampleFile.findByPk(id);
    if (!file) {
        throw new AppError('Sample File not found', 404);
    }

    await file.destroy();
    return res.send(file);
});

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
};
