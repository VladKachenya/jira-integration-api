import { Router, Request, Response, NextFunction } from "express";
import { wrap } from "async-middleware";

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (
    middleware: Wrapper[],
    router: Router
) => {
    for (const f of middleware) {
        f(router);
    }
};

type Handler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> | void;

type Route = {
    path: string;
    method: string;
    handlers: Handler[];
};

export const applyRoutes = (routes: Route[], router: Router) => {
    for (const route of routes) {
        const { method, path, handlers } = route;
        (router as any)[method](path, handlers.map((handler: Handler) => wrap(handler)));
    }
};