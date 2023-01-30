'use strict';
const { hashPassword } = require('../utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [
            {
                name: 'John Doe',
                username: 'johndoe',
                email: 'johndoe@gmail.com',
                salt: '$2b$08$JvbEk9WpOy.si7xI03Iufe.ikH2u8Hx/qmSTq.ALQI2h.QJVcJQxm',
                password: await hashPassword('johndoepass', '$2b$08$JvbEk9WpOy.si7xI03Iufe.ikH2u8Hx/qmSTq.ALQI2h.QJVcJQxm'),
                created_at: '2023-01-09 07:54:26',
                updated_at: '2023-01-09 07:54:26',
            },
            {
                name: 'Adam Tan',
                username: 'adamtam',
                email: 'adamtan@gmail.com',
                salt: '$2b$08$cc00SSWpgghek7xI03Iufe.ikH2u8Hx/RRRRRRALQI2h.QJVcJQxm',
                password: await hashPassword('adamtanpass', '$2b$08$cc00SSWpgghek7xI03Iufe.ikH2u8Hx/RRRRRRALQI2h.QJVcJQxm'),
                created_at: '2023-01-09 07:54:26',
                updated_at: '2023-01-09 07:54:26',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', null, {});
    },
};
