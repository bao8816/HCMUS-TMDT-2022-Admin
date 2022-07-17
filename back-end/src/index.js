const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const process = require('process');

const routes = require('./routes/index.route');

const db = require('./config/db');
db.connect();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
