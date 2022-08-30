const express = require('express');
const passport = require('passport');
const session = require('express-session');
const config = require('./config/env_config');
const cors = require('cors');
// const cloudinary = require('cloudinary');
const handlebars = require('express-handlebars');
var path = require('path');

const routes = require('./routes/index.route');

const db = require('./config/db');
db.connect();

const app = express();
const PORT = config.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config cors
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Handlebars Middleware
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

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

// Cloudinary config
// cloudinary.config({
//     cloud_name: config.CDN_CLOUD_NAME,
//     api_key: config.CDN_API_KEY,
//     api_secret: config.CDN_API_SECRET
// });

// Route
routes(app);

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
