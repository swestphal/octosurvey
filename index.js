const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const { mongoURI } = require('./config/mongoCredentials');
const { cookieKey } = require('./config/cookieKey');

require('./models/User');
require('./services/passport');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

// 30 days
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [cookieKey],
    })
);

// tell password to use cookies to handle auth
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
app.get('/', (req, res) => res.send({ test: 'OK' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
