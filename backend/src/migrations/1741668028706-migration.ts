import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741668028706 implements MigrationInterface {
    name = 'Migration1741668028706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "bio" text`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "bio"`);
    }

}
