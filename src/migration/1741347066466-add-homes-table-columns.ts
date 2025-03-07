import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHomesTableColumns1741347066466 implements MigrationInterface {
    name = 'AddHomesTableColumns1741347066466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "homes"
            ADD "location" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "homes"
            ADD "heights" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "homes"
            ADD "area" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "homes"
            ADD "admin" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "homes"
            ADD "deposit" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "homes"
            ADD "station_list" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "homes"
            ADD "thumbnails" character varying(255) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "homes" DROP COLUMN "thumbnails"
        `);
        await queryRunner.query(`
            ALTER TABLE "homes" DROP COLUMN "station_list"
        `);
        await queryRunner.query(`
            ALTER TABLE "homes" DROP COLUMN "deposit"
        `);
        await queryRunner.query(`
            ALTER TABLE "homes" DROP COLUMN "admin"
        `);
        await queryRunner.query(`
            ALTER TABLE "homes" DROP COLUMN "area"
        `);
        await queryRunner.query(`
            ALTER TABLE "homes" DROP COLUMN "heights"
        `);
        await queryRunner.query(`
            ALTER TABLE "homes" DROP COLUMN "location"
        `);
    }

}
