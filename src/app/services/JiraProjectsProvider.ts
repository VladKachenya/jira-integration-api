import request from "request-promise";

export interface ICredentials {
    url: string;
    email: string;
    tocken: string;
}

export const getProjects = async (credentials: ICredentials) => {
    const options = {
        method: 'GET',
        url: `https://${credentials.url}/rest/api/3/project`,
        auth: { username: credentials.email, password: credentials.tocken },
        headers: {
            'Accept': 'application/json'
        }
    };
    var response = await request(options);
    return JSON.parse(response);
};