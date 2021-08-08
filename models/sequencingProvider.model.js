const { DataTypes } = require('sequelize');
const db = require('../config/database');

const SequencingProvider = db.define('SequencingProvider', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [2, 50],
        },
    },
});

module.exports = SequencingProvider;
