import { MigrationInterface, QueryRunner } from "typeorm";

export class Main1721402137256 implements MigrationInterface {
    name = 'Main1721402137256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "twoFactorAuthenticationSecret"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "twoFactorAuthenticationSecret"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "stripeCustomerId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "stripeCustomerId"
            SET DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "stripeCustomerId" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "stripeCustomerId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "twoFactorAuthenticationSecret" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "twoFactorAuthenticationSecret" DROP NOT NULL
        `);
    }

}
