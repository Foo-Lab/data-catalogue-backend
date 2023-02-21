const db = require('../config/database');
const User = require('./user.model');
const Status = require('./status.model');
const Organism = require('./organism.model');
const Experiment = require('./experiment.model');
const Sample = require('./sample.model');
const SampleFile = require('./sampleFile.model');
const FileType = require('./fileType.model');
const SequencingProvider = require('./sequencingProvider.model');
const Sequencer = require('./sequencer.model');
const SequencingType = require('./sequencingType.model');

// associations
User.hasMany(Experiment, { foreignKey: 'userId' });
User.hasMany(Sample, { foreignKey: 'userId' });

Status.hasMany(Sample, { foreignKey: 'statusId' });

Organism.hasMany(Sample, { foreignKey: 'organismId' });

SequencingType.hasMany(Sample, { foreignKey: 'sequencingTypeId' });

Experiment.hasMany(Sample, { foreignKey: 'experimentId' });
Experiment.belongsTo(User, { foreignKey: 'userId' });

Sequencer.hasMany(Sample, { foreignKey: 'sequencerId' });

SequencingProvider.hasMany(Sample, { foreignKey: 'sequencingProviderId' });

FileType.hasMany(SampleFile, { foreignKey: 'fileTypeId' });
SampleFile.belongsTo(FileType, { foreignKey: 'fileTypeId' });

Sample.belongsTo(Experiment, { foreignKey: 'experimentId' });
Sample.belongsTo(User, { foreignKey: 'userId' });
Sample.belongsTo(Status, { foreignKey: 'statusId' });
Sample.belongsTo(Organism, { foreignKey: 'organismId' });
Sample.belongsTo(SequencingType, { foreignKey: 'sequencingTypeId' });
Sample.belongsTo(Sequencer, { foreignKey: 'sequencerId' });
Sample.belongsTo(SequencingProvider, { foreignKey: 'sequencingProviderId' });
Sample.hasMany(SampleFile, { foreignKey: 'sampleId' });

(async () => {
    try {
        await db.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = {
    User,
    Status,
    Organism,
    Experiment,
    Sample,
    SampleFile,
    FileType,
    SequencingProvider,
    Sequencer,
    SequencingType,
};
