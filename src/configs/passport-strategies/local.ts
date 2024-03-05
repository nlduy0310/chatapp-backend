import passport from 'passport';
import { Strategy } from 'passport-local';

passport.use(
    new Strategy(
        {
            usernameField: 'email',
        },
        (email, password, done) => {},
    ),
);
