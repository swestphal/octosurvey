const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;
const passportKeys = require('../config/passportKeys');

passport.use(
    new GoogleStategy(
        {
            clientID: passportKeys.googleClientID,
            clientSecret: passportKeys.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('access token', accessToken);
            console.log('refresh token', refreshToken);
            console.log('profile token', profile);
        }
    )
);
