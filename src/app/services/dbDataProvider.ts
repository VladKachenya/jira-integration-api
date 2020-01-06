import { getRepository } from "typeorm";
import { Product } from "../../model/entities/Product";
import { Project } from "../../model/entities/Project";
import { User } from "../../model/entities/User";

export const getProductProjects = async (productUrl: string): Promise<Project[] | undefined> => {
    const products = await getRepository(Product)
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.projects", "projects")
        .where("products.url = :url", { url: productUrl }).getOne();
    return products?.projects;
};

export const haveUserForProduct = async (productUrl: string, userEmail: string, userToken: string): Promise<boolean> => {
    const count = await getRepository(Product)
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.users", "users")
        .leftJoinAndSelect("users.tokens", "tokens")
        .where("products.url = :url", { url: productUrl })
        .andWhere("users.email = :email", { email: userEmail })
        .andWhere("tokens.value = :value", {value: userToken})
        .getCount();
    return count > 0;
};