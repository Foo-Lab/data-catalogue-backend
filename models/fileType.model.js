const { DataTypes } = require('sequelize');
const db = require('../config/database');

const FileType = db.define('FileType', {
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

module.exports = FileType;
