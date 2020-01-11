export interface ICredentials {
    url: string;
    email: string;
    token: string;
}

export interface IProject {
    id: number;
    name: string;
    key: string;
    avatarUrl: string;
    projectType: string;
}