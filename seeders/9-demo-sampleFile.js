'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('sample_files', [
            {
                sample_id: 1,
                file_type_id: 1,
                location: 'location url',
                remarks: 'remarks on experiment 1',
                created_at: '2023-01-09 07:54:26',
                updated_at: '2023-01-09 07:54:26',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('sample_files', null, {});
    },
};
