const { Sequelize } = require('sequelize');
const { SequelizeError } = require('../utils');

const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        define: {
            underscored: true,
        },
    },
);

database.query = async function catchSequelizeError(...args) {
    return Sequelize.prototype.query.apply(this, args).catch((error) => {
        throw new SequelizeError(error);
    });
};

(async () => {
    try {
        await database.authenticate();
        console.log('Connection to database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = database;
