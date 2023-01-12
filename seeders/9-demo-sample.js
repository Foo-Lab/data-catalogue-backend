'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('samples', [
            {
                experiment_id: 1,
                user_id: 1,
                status_id: 1,
                date: '2023-01-10',
                code: 'E1SAMPL1',
                name: 'Sample 1 from Expt 1',
                description: '',
                organism_id: 1,
                tissue: '',
                condition: '',
                treatment: '',
                sequencing_type_id: 1,
                sequencer_id: 1,
                sequencing_provider_id: 1,
                sra: 'SRA1',
                remarks: null,
                created_at: '2023-01-09 07:54:26',
                updated_at: '2023-01-09 07:54:26',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('samples', null, {});
    },
};
