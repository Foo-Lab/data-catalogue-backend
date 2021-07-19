const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = require('./user.model.js');
const Status = require('./status.model.js');
const Organism = require('./organism.model.js');
const Experiment = require('./experiment.model.js');
const SampleFile = require('./sampleFile.model.js');
const SequencingProvider = require('./sequencingProvider.model.js');
const Seqeuncer = require('./seqeuncer.model.js');
const SequencingType = require('./sequencingType.model.js');

const SampleFile = require('./sampleFile.model.js');

const Sample = db.define('Sample', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        //do i put the ref to sample_files?
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key : 'id',
        },
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Status,
            key : 'id',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    organism_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Organism,
            key : 'id',
        },
    },
    tissue: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    condition: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    treatment: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    sequecing_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SequencingType,
            key : 'id',
        },
    },
    sequencer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Seqeuncer,
            key : 'id',
        },
    },
    sequencing_provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    SRA: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Sample;
