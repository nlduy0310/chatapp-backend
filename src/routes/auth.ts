import { Router } from 'express';
import controller from '@controllers/auth';
import { createEmailChain, createPasswordChain } from '@middlewares/validators/body';
import { validationResultHandler } from '@middlewares/validators';
import passport from 'passport';

const router = Router();

router.post(
    '/register',
    createEmailChain('email', 'request'),
    createPasswordChain('password', 'request'),
    validationResultHandler,
    controller.handleRegister
);

router.post(
    '/login',
    createEmailChain('email', 'request'),
    createPasswordChain('password', 'request'),
    validationResultHandler,
    passport.authenticate('local'),
    [controller.handleSuccessLogin, controller.handleFailedLogin]
);

export default router;
