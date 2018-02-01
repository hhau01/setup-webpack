const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const { GITHUB_CLIENTID, GITHUB_SECRET } = require('../config/keys');

const app = express();
const sequelize = require('./database/postgres');

sequelize.authenticate()
  .then(() => console.log('Connected to Postgres DB...'))
  .catch(err => console.error('Unable to connect to DB...\n', err));

const userController = require('./database/userController');
// const configController = require('./database/configController');

const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Oauth stuff
app.use(session({
  secret: 'testing',
  cookie: { maxAge: 36000000 },
  saveUninitialized: true,
  resave: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // userController.getUser(id, (user) => {
  //   done(null, false);
  // });
  done(null, user);
});

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENTID,
  clientSecret: GITHUB_SECRET,
  callbackURL: 'http://localhost:3000/oauth/github/callback',
}, (accessToken, refreshToken, profile, cb) => {
  userController.getUser(profile.id, (user) => {
    if (user) {
      cb(null, user);
    } else {
      userController.addUser(profile._raw, (user) => {
        cb(null, user);
      });
    }
  });
}));

app.get('/oauth/github', passport.authenticate('github', { scope: ['profile'] }));

app.get('/oauth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/auth', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json({});
  }
});

app.use(express.static(path.join(__dirname, '../build')));

app.listen(SERVER_PORT, () => console.log(`App listening on port ${SERVER_PORT}...`));
