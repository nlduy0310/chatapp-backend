import { Middleware } from '@middlewares/types';
import { validationResult } from 'express-validator';

export const validationResultHandler: Middleware = (req, res, next) => {
    const result = validationResult(req);

    if (result.isEmpty()) return next();

    return res
        .status(400)
        .send(result.array().at(0)?.msg || 'An error occured when validating the request');
};
