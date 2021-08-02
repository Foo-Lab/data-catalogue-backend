const { DataTypes } = require('sequelize');

const db = require('../config/database');
const Sample = require('./sample.model');
const FileType = require('./fileType.model');

const SampleFile = db.define('SampleFile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sampleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sample,
            key: 'id',
        },
    },
    fileTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: FileType,
            key: 'id',
        },
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = SampleFile;
