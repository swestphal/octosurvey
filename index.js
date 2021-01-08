const express = require('express');
const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;
const passportKeys = require('./config/passportKeys');

const app = express();

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

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));
const PORT = process.env.PORT || 5000;
app.listen(PORT);
