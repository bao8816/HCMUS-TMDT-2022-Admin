const productRoute = require('./product.route');
const orderRoute = require('./order.route');
const authRoute = require('./auth.route');
const homeRoute = require('./home.route');

function routes(app) {
    app.use('/products', productRoute);
    app.use('/orders', orderRoute);
    app.use('/', authRoute);
    app.use('/', homeRoute);
}

module.exports = routes;
