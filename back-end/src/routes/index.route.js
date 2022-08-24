const productRoute = require('./product.route');
const orderRoute = require('./order.route');
const brandRoute = require('./brand.route');
const categoryRoute = require('./category.route');
const authRoute = require('./auth.route');
const homeRoute = require('./home.route');

function routes(app) {
    app.use('/products', productRoute);
    app.use('/orders', orderRoute);
    app.use('/brands', brandRoute);
    app.use('/categories', categoryRoute);
    app.use('/', authRoute);
    app.use('/', homeRoute);
}

module.exports = routes;
