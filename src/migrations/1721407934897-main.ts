import { MigrationInterface, QueryRunner } from "typeorm";

export class Main1721407934897 implements MigrationInterface {
    name = 'Main1721407934897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "isTwoFactorAuthenticationEnabled"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "isTwoFactorAuthenticationEnabled"
            SET DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "isTwoFactorAuthenticationEnabled" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "isTwoFactorAuthenticationEnabled" DROP NOT NULL
        `);
    }

}
