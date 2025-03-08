import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHomesPhotoColumn1741411373058 implements MigrationInterface {
    name = 'AddHomesPhotoColumn1741411373058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "homes"
            ADD "photo_url" character varying(255) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "homes" DROP COLUMN "photo_url"
        `);
    }

}
