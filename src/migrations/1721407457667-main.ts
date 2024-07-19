import { MigrationInterface, QueryRunner } from "typeorm";

export class Main1721407457667 implements MigrationInterface {
    name = 'Main1721407457667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "monthlySubscriptionStatus"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "monthlySubscriptionStatus" character varying
        `);
    }

}
