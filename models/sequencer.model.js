const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Sequencer = db.define('Sequencer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
});

module.exports = Sequencer;
