const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const authController = require('../app/controllers/auth.controller');
const Admin_account = require('../app/models/admin_account.model');

passport.use(new LocalStrategy(function verify(username, password, cb) {
    Admin_account.findOne({ email: username }, function (err, user) {
        if (err) { 
          return cb(err); 
        }
        if (!user) { 
          return cb(null, false); 
        }
        if (!bcrypt.compareSync(password, user.password)) { 
          return cb(null, false); 
        }
        return cb(null, user);
    }
    );
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

router.post('/signup', authController.signUp);
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin'
}));

module.exports = router;
