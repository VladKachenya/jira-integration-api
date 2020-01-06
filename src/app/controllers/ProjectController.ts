import { ICredentials } from "../services/dataModels";
import { getCredentialsExistence, getDbProjects, getJiraProjects, AddOrUpdateCredentialsProjects } from "../services/service";

export const getJiraProjectsByCredentials = async (credintials: ICredentials) => {
    if(await getCredentialsExistence(credintials))
    {
        return getDbProjects(credintials);
    }else{
        const projects = await getJiraProjects(credintials); 
        await AddOrUpdateCredentialsProjects(credintials, projects);
        return projects;
    }
}