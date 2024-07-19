import { MigrationInterface, QueryRunner } from "typeorm";

export class Main1721367395488 implements MigrationInterface {
    name = 'Main1721367395488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "phoneNumber" character varying,
                "name" character varying NOT NULL,
                "password" character varying,
                "isRegisteredWithGoogle" boolean,
                "avatarId" integer,
                "currentHashedRefreshToken" character varying,
                "twoFactorAuthenticationSecret" character varying,
                "isTwoFactorAuthenticationEnabled" boolean,
                "stripeCustomerId" character varying,
                "monthlySubscriptionStatus" character varying,
                "isEmailConfirmed" boolean,
                "isPhoneNumberConfirmed" boolean,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
