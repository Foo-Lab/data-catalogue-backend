const { DataTypes } = require('sequelize');

const db = require('../config/database');
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
    },
    condition: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    treatment: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    sequecingTypeId: {
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
        allowNull: false,
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = Sample;
