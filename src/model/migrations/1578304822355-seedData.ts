import { MigrationInterface, QueryRunner, getRepository, ObjectType } from "typeorm";
import { TokenSeed, UserSeed, ProductSeed, ProjectSeed } from "../seeds";
import { Token } from "../entities/Token";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Project } from "../entities/Project";

export class seedData1578304822355 implements MigrationInterface {

    private async addRange<T>(entities: T[], entityClass: ObjectType<T>): Promise<T[]> {
        return Promise.all(entities.map(async (entity) => {
            return await getRepository(entityClass).save(entity);
        }))
    }

    public async up(queryRunner: QueryRunner): Promise<any> {
        const typedTokens: Token[] = TokenSeed as Token[];
        const typedUsers: User[] = UserSeed as User[];
        const typedProjects: Project[] = ProjectSeed as Project[];
        const typedProduct: Product[] = ProductSeed as Product[];

        typedUsers[0].tokens = [typedTokens[0], typedTokens[1]];
        typedUsers[1].tokens = [typedTokens[2]];
        typedUsers[2].tokens = [typedTokens[3], typedTokens[4]];

        typedProduct[0].users = [typedUsers[0], typedUsers[1], typedUsers[2]];
        typedProduct[0].projects = [typedProjects[0], typedProjects[1], typedProjects[2]];

        typedProduct[1].users = [typedUsers[0], typedUsers[1], typedUsers[2]];
        typedProduct[1].projects = [typedProjects[3]];

        typedProduct[2].users = [typedUsers[0], typedUsers[1], typedUsers[2]];
        typedProduct[2].projects = [typedProjects[4], typedProjects[5]];

        //If this invoke await it`s make ERROR!!!
        getRepository(Product).save(typedProduct);
        console.log(typedUsers);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
