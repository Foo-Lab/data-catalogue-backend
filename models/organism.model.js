const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Organism = db.define('Organism', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },

});

module.exports = Organism;
