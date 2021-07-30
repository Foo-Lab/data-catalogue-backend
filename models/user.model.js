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
    hash: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

const crypto = require('crypto');
User.beforeCreate(async (user, options) => {
    console.log('beforecreate', user)
    const { salt, hash } = await hashPassword(user.hash);
    user.hash = hash;
    user.salt = salt;
    console.log(user);
});

const hashPassword = ((password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(
        password, 
        salt,  
        1000, 
        128, 
        'sha512'
    ).toString(`hex`); 
    return { salt, hash };
});

module.exports = User;
