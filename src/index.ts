// ---- Load environment variables -----
import 'dotenv/config';

// ----- Library imports -----
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

// ----- Type imports -----
import { ErrorRequestHandler } from 'express';

// ----- Route imports -----
import authRouter from '@routes/auth';

// ----- Other imports -----
import { DEFAULT_SESSION_SECRET } from '@configs/defaults';

const PORT = process.env.PORT || 3000;
const app = express();

// ----- Configs -----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET || DEFAULT_SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60, // 1 minutes
        },
    }),
);
app.use(passport.initialize());
app.use(passport.session());

// ----- Main routes -----
app.use('/auth', authRouter);

// ----- Catching undefined routes -----
app.use((req, res, next) => {
    return res.sendStatus(404);
});

// ----- Error handler -----
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    return res.sendStatus(500);
};
app.use(errorHandler);

// ----- Connect -----
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING ?? '')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch(() => {
        console.error('Can not connect to MongoDB');
    });
