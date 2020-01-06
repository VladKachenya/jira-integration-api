import request from "request-promise";
import { ICredentials } from "./dataModels";

export const getProjects = async (productUrl: string, email: string, token: string) => {
    const options = {
        method: 'GET',
        url: `https://${productUrl}/rest/api/3/project`,
        auth: { username: email, password: token },
        headers: {
            'Accept': 'application/json'
        }
    };
    var response = await request(options);
    return JSON.parse(response);
};