import { RequestHandler, ErrorRequestHandler } from 'express';

export type RouteController = {
    [name: string]: RequestHandler | ErrorRequestHandler;
};
