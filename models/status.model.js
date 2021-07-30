const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Status = db.define('Status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },

});

module.exports = Status;
