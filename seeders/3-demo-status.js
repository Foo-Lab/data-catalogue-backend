'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Statuses', [
            {
                name: 'New',
                created_at: '2023-01-09 07:54:26',
                updated_at: '2023-01-09 07:54:26',
            },
            {
                name: 'Processing',
                created_at: '2023-01-09 07:54:26',
                updated_at: '2023-01-09 07:54:26',
            },
            {
                name: 'Done',
                created_at: '2023-01-09 07:54:26',
                updated_at: '2023-01-09 07:54:26',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Statuses', null, {});
    },
};
