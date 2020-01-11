import { ICredentials } from "../services/dataModels";
import { getCredentialsExistence, getDbProjects, getJiraProjects, AddOrUpdateCredentialsProjects } from "../services/service";

export const getJiraProjectsByCredentials = async (credintials: ICredentials) => {
    if (!await getCredentialsExistence(credintials)) {
        const projects = await getJiraProjects(credintials);
        if (projects.length !== 0) {
            await AddOrUpdateCredentialsProjects(credintials, projects);
        }
    }
    return getDbProjects(credintials);
}