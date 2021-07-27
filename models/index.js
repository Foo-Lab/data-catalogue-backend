const User = require('./user.model.js');
 const Status = require('./status.model.js');
 const Organism = require('./organism.model.js');
 const Experiment = require('./experiment.model.js');
 const Sample = require('./sample.model.js');
 const SampleFile = require('./sampleFile.model.js');
 const FileType = require('./fileType.model.js');
 const SequencingProvider = require('./sequencingProvider.model.js');
 const Sequencer = require('./sequencer.model.js');
 const SequencingType = require('./sequencingType.model.js');


 // associations

User.hasMany(Experiment, {foreignKey: "user_id"});
User.hasMany(Sample, {foreignKey: "user_id"});

Status.hasMany( Sample, {foreignKey: "status_id"});

Organism.hasMany( Sample, {foreignKey: "organism_id"});

SequencingType.hasMany( Sample, {foreignKey: "sequencing_type_id"});

Experiment.hasMany(Sample, {foreignKey : "experiment_id"});
Experiment.belongsTo(User, {foreignKey : "user_id"} );

Sequencer.hasMany(Sample, {foreignKey : "sequencer_id"});

SequencingProvider.hasMany( Sample, {foreignKey : "sequencing_provider_id"});

FileType.hasMany(SampleFile, {foreignKey : "file_type_id"});

Sample.belongsTo(Experiment, {foreignKey : "experiment_id"});
Sample.belongsTo(User, {foreignKey : "user_id"});
Sample.belongsTo(Status, {foreignKey : "Status_id"});
Sample.belongsTo(Organism, {foreignKey : "organism_id"});
Sample.belongsTo(SequencingType, {foreignKey : "sequencing_type_id"});
Sample.belongsTo(Sequencer, {foreignKey : "sequencer_id"});
Sample.belongsTo(SequencingProvider, {foreignKey : "sequencing_provider_id"});
Sample.hasMany(SampleFile, {foreignKey : "sample_id"});


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
    SequencingType
};

