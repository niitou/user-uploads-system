import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739331571195 implements MigrationInterface {
    name = 'Migration1739331571195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "REL_f44d0cd18cfd80b0fed7806c3b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profile_id"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "UQ_d752442f45f258a8bdefeebb2f2" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "UQ_d752442f45f258a8bdefeebb2f2"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profile_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "REL_f44d0cd18cfd80b0fed7806c3b" UNIQUE ("profile_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
