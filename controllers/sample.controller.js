const {
    Sample, Experiment, User, Status, Organism, SequencingType, Sequencer, SequencingProvider,
} = require('../models/index');
const { catchAsync, AppError } = require('../utils');

const create = catchAsync(async (req, res) => {
    const {
        experimentId,
        userId,
        statusId,
        date,
        code,
        name,
        description,
        organismId,
        tissue,
        condition,
        treatment,
        sequencingTypeId,
        sequencerId,
        sequencingProviderId,
        sra,
        remarks,
    } = req.body;

    const sample = await Sample.create({
        experimentId,
        userId,
        statusId,
        date,
        code,
        name,
        description,
        organismId,
        tissue,
        condition,
        treatment,
        sequencingTypeId,
        sequencerId,
        sequencingProviderId,
        sra,
        remarks,
    });
    return res.send(sample);
});

const findAll = catchAsync(async (req, res) => {
    const sample = await Sample.findAll({
        include: [
            Experiment, User, Status, Organism, SequencingType, Sequencer, SequencingProvider,
        ],
    });
    return res.send(sample);
});

const findOne = catchAsync(async (req, res) => {
    const { id } = req.params;

    const sample = await Sample.findByPk(id, {
        include: [
            Experiment, User, Status, Organism, SequencingType, Sequencer, SequencingProvider,
        ],
    });
    if (!sample) {
        throw new AppError('Sample not found', 404);
    }
    return res.send(sample);
});

const update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const {
        experimentId,
        userId,
        statusId,
        date,
        code,
        name,
        description,
        organismId,
        tissue,
        condition,
        treatment,
        sequencingTypeId,
        sequencerId,
        sequencingProviderId,
        sra,
        remarks,
    } = req.body;

    const sample = await Sample.findByPk(id);
    if (!sample) {
        throw new AppError('Sample not found', 404);
    }

    await sample.update({
        experimentId,
        userId,
        statusId,
        date,
        code,
        name,
        description,
        organismId,
        tissue,
        condition,
        treatment,
        sequencingTypeId,
        sequencerId,
        sequencingProviderId,
        sra,
        remarks,
    });
    return res.send(sample);
});

const remove = catchAsync(async (req, res) => {
    const { id } = req.params;

    const sample = await Sample.findByPk(id);
    if (!sample) {
        throw new AppError('Sample not found', 404);
    }

    await sample.destroy();
    return res.send(sample);
});

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
};
