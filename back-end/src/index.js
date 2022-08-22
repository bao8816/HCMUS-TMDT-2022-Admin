const express = require('express');
const passport = require('passport');
const session = require('express-session');
const config = require('./config/env_config');

const routes = require('./routes/index.route');

const db = require('./config/db');
db.connect();

const app = express();
const PORT = 2000 || config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport config
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.authenticate('session'));
  
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

// Route
routes(app);

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
