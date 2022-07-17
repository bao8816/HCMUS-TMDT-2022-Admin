const productRoute = require('./product.route');
const homeRoute = require('./home.route');

function routes(app) {
    app.use('/products', productRoute);
    app.use('/', homeRoute);
}

module.exports = routes;
