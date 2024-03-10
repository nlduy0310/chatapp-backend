import passport from 'passport';
import { Types } from 'mongoose';
import User from '@database/models/User';

declare global {
    namespace Express {
        interface User {
            _id: Types.ObjectId;
            email: string;
        }
    }
}

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    try {
        const foundUser = await User.findById(_id);
        if (!foundUser) throw new Error('Can not deserialize user: Id not found');
        done(null, foundUser);
    } catch (error) {
        console.error(error);
        done(error);
    }
});
