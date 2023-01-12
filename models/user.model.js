const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');

const db = require('../config/database');

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50],
        },
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 20],
        },
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 50],
            isEmail: true,
        },
    },
    salt: {
        type: DataTypes.CHAR(60),
        default: null,
        validate: {
            notEmpty: true,
            len: [5, 25],
        },
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [5, 25],
        },
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        validate: {
            isBoolean: true,
        },
    },
});

User.beforeCreate(async (user) => {
    user.salt = await bcrypt.genSalt(8);
    user.password = await bcrypt.hash(user.password, user.salt);
});

User.prototype.validatePassword = function comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = User;
