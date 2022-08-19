const productRoute = require('./product.route');
const authRoute = require('./auth.route');
const homeRoute = require('./home.route');

function routes(app) {
    app.use('/products', productRoute);
    app.use('/signup', authRoute);
    app.use('/', homeRoute);
}

module.exports = routes;
