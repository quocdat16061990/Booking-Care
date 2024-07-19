import { MigrationInterface, QueryRunner } from "typeorm";

export class Main1721407430628 implements MigrationInterface {
    name = 'Main1721407430628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "isRegisteredWithGoogle"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatarId"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "stripeCustomerId"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "stripeCustomerId" character varying NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "avatarId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "isRegisteredWithGoogle" boolean
        `);
    }

}
