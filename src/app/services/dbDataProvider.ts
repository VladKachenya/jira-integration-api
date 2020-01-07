import { getRepository } from "typeorm";
import { Product } from "../../model/entities/Product";
import { User } from "../../model/entities/User";
import { Token } from "../../model/entities/Token";

export const getProductWithProjects = async (productUrl: string): Promise<Product | undefined> => {
    const products = await getRepository(Product)
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.projects", "projects")
        .where("products.url = :url", { url: productUrl }).getOne();
    return products;
};

export const getUser = async (userEmail: string): Promise<User | undefined> => {
    const user = await getRepository(User)
        .createQueryBuilder("users")
        .leftJoinAndSelect("users.tokens", "tokens")
        .where("users.email = :email", { email: userEmail })
        .getOne();
    return user;
};

export const haveUserForProduct = async (productUrl: string, userEmail: string, userToken: string): Promise<boolean> => {
    const count = await getRepository(Product)
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.users", "users")
        .leftJoinAndSelect("users.tokens", "tokens")
        .where("products.url = :url", { url: productUrl })
        .andWhere("users.email = :email", { email: userEmail })
        .andWhere("tokens.value = :value", { value: userToken })
        .getCount();
    return count > 0;
};

export const pushToken = async (token: Token) => {
    await getRepository(Token).save(token);
}

export const pushProduct = async (product: Product) => {
    await getRepository(Product).save(product);
}