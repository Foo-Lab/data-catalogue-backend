const { DataTypes } = require('sequelize');

const db = require('../config/database');
const Experiment = require('./experiment.model');
const User = require('./user.model');
const Status = require('./status.model');
const Organism = require('./organism.model');
const SequencingProvider = require('./sequencingProvider.model');
const Sequencer = require('./sequencer.model');
const SequencingType = require('./sequencingType.model');

const Sample = db.define('Sample', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    experimentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Experiment,
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Status,
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
        },
    },
    code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [2, 10],
        },
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100],
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    organismId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Organism,
            key: 'id',
        },
    },
    tissue: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100],
        },
    },
    condition: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 255],
        },
    },
    treatment: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 255],
        },
    },
    sequencingTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SequencingType,
            key: 'id',
        },
    },
    sequencerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sequencer,
            key: 'id',
        },
    },
    sequencingProviderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SequencingProvider,
            key: 'id',
        },
    },
    sra: {
        type: DataTypes.STRING(10),
        allowNull: true,
        validate: {
            len: [2, 10],
        },
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = Sample;
