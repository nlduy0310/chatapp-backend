import User from '@database/models/User';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { compareSync } from 'bcrypt';

export default passport.use(
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const foundUser = await User.findOne().where({ email: email }).exec();
                if (!foundUser)
                    throw new Error('Failed to authenticate: Can not find the specified user');
                if (!compareSync(password, foundUser.hashedPw))
                    throw new Error('Failed to authenticate: Credentials do not match');
                done(null, foundUser);
            } catch (error) {
                // console.error(error);
                done(error);
            }
        }
    )
);
