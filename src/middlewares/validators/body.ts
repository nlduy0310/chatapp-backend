import { body } from 'express-validator';
import { ALPHA_NUMERIC_PATTERN } from '@configs/patterns';

export const createEmailChain = (
    fieldName: string = 'email',
    bailLevel: 'chain' | 'request' = 'chain',
) => {
    return body(fieldName)
        .exists()
        .withMessage(`'${fieldName}' field is required`)
        .bail({ level: bailLevel })
        .isString()
        .withMessage(`'${fieldName}' must be a string`)
        .bail({ level: bailLevel })
        .trim()
        .isEmail()
        .withMessage('Invalid email address')
        .bail({ level: bailLevel });
};

export const createPasswordChain = (
    fieldName: string = 'password',
    bailLevel: 'chain' | 'request' = 'chain',
) => {
    return body(fieldName)
        .exists()
        .withMessage(`'${fieldName}' field is required`)
        .bail({ level: bailLevel })
        .isString()
        .withMessage(`'${fieldName}' must be a string`)
        .bail({ level: bailLevel })
        .trim()
        .isLength({ min: 8, max: 32 })
        .withMessage(`'${fieldName}' field's length must be between 8 and 32`)
        .bail({ level: bailLevel })
        .matches(ALPHA_NUMERIC_PATTERN)
        .withMessage(`'${fieldName}' must be an alphanumeric string`)
        .bail({ level: bailLevel });
};
