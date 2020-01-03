import { Request, Response } from "express";
import { getJiraProjectsByCredentials } from "../controllers/ProjectController";

export default [
    {
        path: "/api/v1/projects",
        method: "post",
        handler: [
            async ({ body }: Request, res: Response) => {
                const result = await getJiraProjectsByCredentials(body);
                res.status(200).send(result);
            }
        ]
    }
];