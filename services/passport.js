const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const passportKeys = require('../config/passportKeys');

const User = mongoose.model('users');

// turn userinstance to id
passport.serializeUser((user, done) => {
    done(null, user.id);
});
// id and turn it back to userinstance
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user));
});

passport.use(
    new GoogleStategy(
        {
            clientID: passportKeys.googleClientID,
            clientSecret: passportKeys.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser); // no error, existingUser
            }
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        }
    )
);
