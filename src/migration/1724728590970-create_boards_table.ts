import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBoardsTable1724728590970 implements MigrationInterface {
    name = 'CreateBoardsTable1724728590970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."boards_visibility_enum" AS ENUM('public', 'private', 'workspace_public')`);
        await queryRunner.query(`CREATE TABLE "boards" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "title" character varying(255) NOT NULL, "visibility" "public"."boards_visibility_enum" NOT NULL DEFAULT 'workspace_public', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "boards" ADD CONSTRAINT "FK_a235c3aff3d3d4b91eaa3a7c338" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP CONSTRAINT "FK_a235c3aff3d3d4b91eaa3a7c338"`);
        await queryRunner.query(`DROP TABLE "boards"`);
        await queryRunner.query(`DROP TYPE "public"."boards_visibility_enum"`);
    }

}
