const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Organism = db.define('Organism', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [2, 25],
        },
    },
});

module.exports = Organism;
