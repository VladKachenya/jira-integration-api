import { ICredentials, IProject } from "./dataModels";
import { haveUserForProduct, getProductProjects } from "./dbDataProvider";
import { getProjects } from "./JiraProjectsProvider";

export const getCredentialsExistence = async (credentials: ICredentials): Promise<boolean> => {
    return await haveUserForProduct(credentials.url, credentials.email, credentials.tocken);
};

export const getDbProjects = async (credentials: ICredentials): Promise<IProject[]> => {
    const result: IProject[] = [];
    const dbProjects = await getProductProjects(credentials.url);
    dbProjects?.forEach((element, index) => {
        result[index] = ({
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
    const jiraProjects = (await getProjects(credentials.url, credentials.email, credentials.tocken)) as any[];
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

export const AddOrUpdateCredentialsProjects = async (credentials: ICredentials, projects: IProject[]) =>{
    
}