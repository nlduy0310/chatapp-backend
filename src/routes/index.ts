import { Express } from 'express';
import authRouter from './auth';
import { ErrorRequestHandler } from 'express';

export default function route(app: Express) {
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
}
