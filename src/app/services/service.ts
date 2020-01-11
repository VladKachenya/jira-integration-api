import { ICredentials, IProject } from "./dataModels";
import { haveUserForProduct, getUser, pushProduct, pushToken, getProductWithProjects } from "./dbDataProvider";
import { getProjects } from "./JiraProjectsProvider";
import { Product } from "../../model/entities/Product";
import { User } from "../../model/entities/User";
import { Token } from "../../model/entities/Token";
import { Project } from "../../model/entities/Project";

export const getCredentialsExistence = async (credentials: ICredentials): Promise<boolean> => {
    return await haveUserForProduct(credentials.url, credentials.email, credentials.token);
};

export const getDbProjects = async (credentials: ICredentials): Promise<IProject[]> => {
    const result: IProject[] = [];
    const dbProjects = (await getProductWithProjects(credentials.url))?.projects;
    dbProjects?.forEach((element, index) => {
        result[index] = ({
            id: element.id,
            avatarUrl: element.avatarUrl,
            key: element.key,
            name: element.name,
            projectType: element.projectType
        } as IProject);
    });
    return result;
}

export const getJiraProjects = async (credentials: ICredentials): Promise<IProject[]> => {
    const result: IProject[] = [];
    const jiraProjects = (await getProjects(credentials.url, credentials.email, credentials.token)) as any[];
    jiraProjects.forEach((element, index) => {
        result[index] = ({
            avatarUrl: element.avatarUrls["48x48"],
            key: element.key,
            name: element.name,
            projectType: element.projectTypeKey
        } as IProject);
    });
    return result;
}

export const AddOrUpdateCredentialsProjects = async (credentials: ICredentials, projects: IProject[]) => {
    console.log(credentials);
    let product: Product = await getProductWithProjects(credentials.url) as Product;
    if (product === undefined) {
        product = new Product();
        product.url = credentials.url;
        product.projects = [];
    }
    projects.forEach(project => {
        if (product?.projects.length === 0 || product?.projects.find(element => element.name === project.name) === undefined) {
            const dbProject = new Project();
            dbProject.avatarUrl = project.avatarUrl;
            dbProject.key = project.key;
            dbProject.name = project.name;
            dbProject.projectType = project.projectType;
            product.projects[product.projects.length] = dbProject;
        }
    });

    product.users = [];

    let user = await getUser(credentials.email);
    if (user === undefined) {
        user = new User();
        user.email = credentials.email;
        let token = new Token();
        token.value = credentials.token;
        user.tokens = [token];
        product.users[product.users.length] = user;
    } else {
        if (user.tokens.length == 0 || user.tokens.find(element => element.value === credentials.token) === undefined) {
            const token = new Token();
            token.value = credentials.token;
            token.user = user;
            await pushToken(token);
        }
    }
    await pushProduct(product);
}