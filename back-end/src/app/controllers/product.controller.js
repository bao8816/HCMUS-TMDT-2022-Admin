const Product = require('../models/product.model');
const { multipleMongooseToObject } = require('../../utils/mongoose');
const { mongooseToObject } = require('../../utils/mongoose');
const cloudinary = require('cloudinary');


class ProductController {
    getProducts(req, res) {
        if (req.isAuthenticated()) {
            Product.find({})
                .then(products => {
                    res.json(multipleMongooseToObject(products));
                }).catch(err => {
                    res.json({
                        message: err.message
                    });
                })
        } else {
            res.json({
                message: 'You are not authorized'
            });
        }
    }

    getProductById(req, res) {
        if (req.isAuthenticated()) {
            Product.findById(req.params.id)
                .then(product => {
                    res.json(mongooseToObject(product));
                }).catch(err => {
                    res.json({
                        message: err.message
                    });
                })
        } else {
            res.json({
                message: 'You are not authorized'
            });
        };
    }

    getProductByBrand(req, res) {
        if (req.isAuthenticated()) {
            Product.find({ brand: req.params.brand })
                .then(product => {
                    res.json(multipleMongooseToObject(product));
                }).catch(err => {
                    res.json({
                        message: err.message
                    });
                })
        } else {
            res.json({
                message: 'You are not authorized'
            });
        };
    }

    getProductByCategory(req, res) {
        if (req.isAuthenticated()) {
            Product.find({ category: req.params.category })
                .then(product => {
                    res.json(multipleMongooseToObject(product));
                }).catch(err => {
                    res.json({
                        message: err.message
                    });
                })
        } else {
            res.json({
                message: 'You are not authorized'
            });
        };
    }

    createProduct(req, res) {
        if (req.isAuthenticated()) {
            const product = new Product(req.body);
            product.save()
                .then(product => {
                    res.json(mongooseToObject(product));
                }).catch(err => {
                    res.status(500).json({ message: err.message });
                });
        } else {
            res.json({
                message: 'You are not authorized'
            });
        };
    }

    updateProduct(req, res) {
        if (req.isAuthenticated()) {
            Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(product => {
                res.json(mongooseToObject(product));
            }).catch(err => {
                res.status(500).json({ message: err.message });
            });
        } else {
            res.json({
                message: 'You are not authorized'
            });
        };
    }

    deleteProduct(req, res) {
        if (req.isAuthenticated()) {
            Product.deleteOne({ _id: req.params.id })
                .then(() => {
                    res.json({
                        message: 'Product deleted successfully'
                    });
                }).catch(err => {
                    res.status(500).json({ message: err.message });
                });
        } else {
            res.json({
                message: 'You are not authorized'
            });
        };
    }
}

module.exports = new ProductController();
