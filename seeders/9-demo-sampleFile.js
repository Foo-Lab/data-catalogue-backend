'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('sample_files', [
            {
                sample_id: 1,
                file_type_id: 1,
                location_url: 'https://www.amazon.com/human_heart_control_fastq',
                location_s3_url: 's3://human_heart_control_fastq',
                remarks: 'human heart control fastq',
                created_at: '2023-01-09 07:54:26',
                updated_at: '2023-01-09 07:54:26',
            },            {
                sample_id: 1,
                file_type_id: 1,
                location_url: 'https://www.amazon.com/human_heart_control_bam',
                location_s3_url: 's3://human_heart_control_bam',
                remarks: 'human heart control bam',
                created_at: '2023-01-09 07:54:26',
                updated_at: '2023-01-09 07:54:26',
            },            {
                sample_id: 2,
                file_type_id: 1,
                location_url: 'https://www.amazon.com/mouse_cardiomyocyte_drug_A_fastq',
                location_s3_url: 's3://mouse_cardiomyocyte_drug_A_fastq',
                remarks: 'mouse cardiomyocyte drug A fastq ',
                created_at: '2023-01-09 07:54:26',
                updated_at: '2023-01-09 07:54:26',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('sample_files', null, {});
    },
};
