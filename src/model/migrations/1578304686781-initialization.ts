import {MigrationInterface, QueryRunner} from "typeorm";

export class initialization1578304686781 implements MigrationInterface {
    name = 'initialization1578304686781'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "key" character varying NOT NULL, "avatarUrl" character varying NOT NULL, "projectType" character varying NOT NULL, "productId" integer, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "products_users_users" ("productsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_24dc875fa011c5f0058fd39f76d" PRIMARY KEY ("productsId", "usersId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c4b2200a837cf065b24e596e56" ON "products_users_users" ("productsId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_27489be60211217372914c620a" ON "products_users_users" ("usersId") `, undefined);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_7c1c4a2035c1faa4e3ac6c0ee85" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "products_users_users" ADD CONSTRAINT "FK_c4b2200a837cf065b24e596e561" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "products_users_users" ADD CONSTRAINT "FK_27489be60211217372914c620a6" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "products_users_users" DROP CONSTRAINT "FK_27489be60211217372914c620a6"`, undefined);
        await queryRunner.query(`ALTER TABLE "products_users_users" DROP CONSTRAINT "FK_c4b2200a837cf065b24e596e561"`, undefined);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`, undefined);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_7c1c4a2035c1faa4e3ac6c0ee85"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_27489be60211217372914c620a"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c4b2200a837cf065b24e596e56"`, undefined);
        await queryRunner.query(`DROP TABLE "products_users_users"`, undefined);
        await queryRunner.query(`DROP TABLE "products"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "tokens"`, undefined);
        await queryRunner.query(`DROP TABLE "projects"`, undefined);
    }

}
