const Product = require('../models/product.model');
const { multipleMongooseToObject } = require('../../utils/mongoose');
const { mongooseToObject } = require('../../utils/mongoose');

class productController {
    getProducts(req, res) {
        Product.find({})
            .then(products => {
                res.json(multipleMongooseToObject(products));
            }).catch(err => {
                res.status(500).json({ message: err.message });
            });
    }

    getProductById(req, res) {
        Product.findById(req.params.id)
            .then(product => {
                res.json(mongooseToObject(product));
            }).catch(err => {
                res.status(500).json({ message: err.message });
            });
    }

    createProduct(req, res) {
        const product = new Product(req.body);
        product.save()
            .then(product => {
                res.json(mongooseToObject(product));
            }).catch(err => {
                res.status(500).json({ message: err.message });
            });
    }

    updateProduct(req, res) {
        Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(product => {
                res.json(mongooseToObject(product));
            }).catch(err => {
                res.status(500).json({ message: err.message });
            });
    }

    deleteProduct(req, res) {
        Product.findByIdAndRemove(req.params.id)
            .then(product => {
                res.json(mongooseToObject(product));
            }).catch(err => {
                res.status(500).json({ message: err.message });
            });
    }
}