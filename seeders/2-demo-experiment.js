'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('experiments', [
            {
                user_id: 1,
                date: '2023-01-09',
                code: 'EXPT-01',
                name: 'experiment 1',
                description: 'description of experiment 1',
                created_at: '2023-01-09 07:54:26',
                updated_at: '2023-01-09 07:54:26',
            },
            {
                user_id: 1,
                date: '2023-01-10',
                code: 'EXPT-02',
                name: 'experiment 2',
                description: 'description of experiment 2',
                created_at: '2023-01-10 07:55:26',
                updated_at: '2023-01-10 07:55:26',
            },
            {
                user_id: 2,
                date: '2023-01-10',
                code: 'EXPT-03',
                name: 'experiment 3',
                description: 'description of experiment 3',
                created_at: '2023-01-10 17:54:26',
                updated_at: '2023-01-10 17:54:26',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('experiments', null, {});
    },
};
