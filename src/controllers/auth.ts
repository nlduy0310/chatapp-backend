import User from '@database/models/User';
import { RouteController } from '@controllers/types';
import { hashSync } from 'bcrypt';
import { NROUND_PASSWORD_HASH } from '@configs/defaults';
import { RequestHandler, ErrorRequestHandler } from 'express';

let controller: RouteController = {};

controller.handleRegister = (async (req, res, next) => {
    const { email: reqEmail, password: reqPassword } = req.body;

    const foundUser = await User.findOne({
        email: reqEmail,
    });
    if (foundUser) {
        return res.status(409).send('Email has already been used');
    }

    const result = await User.create({
        email: reqEmail,
        hashedPw: hashSync(reqPassword, NROUND_PASSWORD_HASH),
    });

    if (result) {
        return res.status(200).send('Account registered successfully');
    } else {
        return res.status(500).send('Some error happened when creating your account');
    }
}) as RequestHandler;

controller.handleSuccessLogin = ((req, res, next) => {
    return res.sendStatus(200);
}) as RequestHandler;

controller.handleFailedLogin = ((err, req, res, next) => {
    return res.status(401).send(err.message || 'Authentication failed');
}) as ErrorRequestHandler;
export default controller;
