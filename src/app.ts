import express from 'express';
import cookieParser from 'cookie-parser';
import { DEFAULT_COOKIE_SECRET, DEFAULT_SESSION_SECRET } from '@configs/defaults';
import session from 'express-session';
import passport from 'passport';

import './passport/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET || DEFAULT_COOKIE_SECRET));
app.use(
    session({
        secret: process.env.SESSION_SECRET || DEFAULT_SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60, // 1 minutes
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

export default app;
