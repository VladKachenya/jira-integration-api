import { Request, Response } from "express";
import { getJiraProjectsByCredentials } from "../controllers/ProjectController";
import { checkCredentialsParams, trimRequestParams } from "../middleware/validators";


export default [
    {
        path: "/",
        method: "get",
        handlers: [
            (req: Request, res: Response) => {
                res.status(200).send("Hello world!");
            }
        ]
    },
    {
        path: "/api/v1/projects",
        method: "post",
        handlers: [
            trimRequestParams,
            checkCredentialsParams,
            async ({ body }: Request, res: Response) => {
                const result = await getJiraProjectsByCredentials(body);
                res.status(200).send(result);
            }
        ]
    }
];