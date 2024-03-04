import { Middleware } from '@middlewares/types';
import { validationResult } from 'express-validator';
import { FieldValidationError } from 'express-validator';

export const validationResultHandler: Middleware = (req, res, next) => {
	const result = validationResult(req);

	if (result.isEmpty()) return next();

	const errorMessages: string[] = [];
	result.array().forEach((error) => {
		
		errorMessages.push(error.msg);
	});
	return res.status(400).json({ errors: errorMessages });
};
