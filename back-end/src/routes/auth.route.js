const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const authController = require('../app/controllers/auth.controller');
const Admin_account = require('../app/models/admin_account.model');

passport.use(new LocalStrategy(function verify(username, password, done) {
    Admin_account.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, email: user.email });
    });
  });
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

router.post('/signin/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin-failed',
}));

router.post('/signup', authController.signUp);
router.get('/signin-failed', authController.signInFailed);
router.get('/signout', authController.signOut);

module.exports = router;
