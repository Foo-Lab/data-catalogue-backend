'use strict';
const { generatePassword } = require('../utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            {
                name: 'John Doe',
                username: 'johndoe',
                email: 'johndoe@gmail.com',
                password: await generatePassword('johndoepass', 8),
                created_at: '2023-01-09 07:54:26',
                updated_at: '2023-01-09 07:54:26',
            },
            {
                name: 'Adam Tan',
                username: 'adamtam',
                email: 'adamtan@gmail.com',
                password: await generatePassword('adamtanpass', 8),
                created_at: '2023-01-09 07:54:26',
                updated_at: '2023-01-09 07:54:26',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
