import { RequestHandler } from 'express';

export type RouteController = {
	[name: string]: RequestHandler;
};
