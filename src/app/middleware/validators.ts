import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";
import { ICredentials } from "../services/dataModels";

export const checkCredentialsParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const credentials: ICredentials = req.body as ICredentials;
    if (!credentials.url || credentials.url.length < 3) {
        throw new HTTP400Error("Missing url parameter");
    } else if (!credentials.email || credentials.url.length < 3) {
        throw new HTTP400Error("Missing url parameter");
    } else if (!credentials.token || credentials.url.length < 3) {
        throw new HTTP400Error("Missing token parameter");
    }
    else {
        next();
    }
};

export const trimRequestParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Object.keys(req.body).map(k => req.body[k] = typeof req.body[k] == 'string' ? req.body[k].trim() : req.body[k]);
    next();
};