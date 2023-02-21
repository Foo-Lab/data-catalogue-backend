const { SampleFile, FileType } = require('../models/index');
const { catchAsync, AppError } = require('../utils');

const create = catchAsync(async (req, res) => {
    const {
        sampleId,
        fileTypeId,
        locationUrl,
        locationS3Url,
        remarks,
    } = req.body;

    const file = await SampleFile.create({
        sampleId,
        fileTypeId,
        locationUrl,
        locationS3Url,
        remarks,
    });
    return res.send(file);
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

    const file = await SampleFile.findAll(options);
    const count = await SampleFile.count();

    return res
        .set({
            'Access-Control-Expose-Headers': 'X-total-count',
            'X-total-count': count,
        })
        .send(file);
});

const findBySampleId = catchAsync(async (req, res) => {
    const { sampleId } = req.params;

    const file = await SampleFile.findAll({
        where: { sampleId },
        include: FileType
    });
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
        locationUrl,
        locationS3Url,
        remarks,
    } = req.body;

    const file = await SampleFile.findByPk(id);
    if (!file) {
        throw new AppError('Sample File not found', 404);
    }

    await file.update({
        sampleId,
        fileTypeId,
        locationUrl,
        locationS3Url,
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
    findBySampleId,
    findOne,
    update,
    remove,
};
