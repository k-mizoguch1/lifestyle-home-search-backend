import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHomesTable1740837303588 implements MigrationInterface {
    name = 'CreateHomesTable1740837303588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."homes_layout_enum" AS ENUM(
                'ワンルーム',
                '1K',
                '1DK',
                '1LDK',
                '2K',
                '2DK',
                '2LDK',
                '3K',
                '3DK',
                '3LDK',
                '4K',
                '4DK',
                '4LDK',
                '5K以上'
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."homes_building_enum" AS ENUM('アパート', 'マンション', '一戸建て・その他')
        `);
        await queryRunner.query(`
            CREATE TABLE "homes" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "prefecture" character varying(255) NOT NULL,
                "city" character varying(255) NOT NULL,
                "rent" integer NOT NULL,
                "layout" "public"."homes_layout_enum" NOT NULL,
                "year" integer NOT NULL,
                "building" "public"."homes_building_enum" NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a85aa6f2e56424fc745effdd5f2" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "homes"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."homes_building_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."homes_layout_enum"
        `);
    }

}
