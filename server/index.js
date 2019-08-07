const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'This is not a very secure secret...',
    resave: false,
    saveUninitialized: false,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use('/api', require('./api/index'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
