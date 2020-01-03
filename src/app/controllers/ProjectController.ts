import { getProjects, ICredentials } from "../services/JiraProjectsProvider";

export const getJiraProjectsByCredentials = async (credintials: ICredentials) => {
    return getProjects(credintials);
}