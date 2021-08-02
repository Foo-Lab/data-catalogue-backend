const { DataTypes } = require('sequelize');

const db = require('../config/database');
const { generateSalt, hashPassword } = require('../utilities');

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    salt: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

User.beforeCreate(async (user) => {
    const salt = generateSalt();
    const hash = await hashPassword(user.password, salt);
    user.password = hash;
    user.salt = salt;
});

module.exports = User;
