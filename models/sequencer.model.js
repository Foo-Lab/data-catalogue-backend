const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Sequencer = db.define('Sequencer', {
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

module.exports = Sequencer;
