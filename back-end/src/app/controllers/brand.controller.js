const Brand = require('../models/brand.model');
const { multipleMongooseToObject } = require('../../utils/mongoose');
const { mongooseToObject } = require('../../utils/mongoose');

class BrandController {
    getBrands(req, res) {
        if (req.isAuthenticated()) {
            Brand.find({})
                .then(brands => {
                    res.json(multipleMongooseToObject(brands));
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
    
    getBrandById(req, res) {
        if (req.isAuthenticated()) {
            Brand.findById(req.params.id)
                .then(brand => {
                    res.json(mongooseToObject(brand));
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

    createBrand(req, res) {
        if (req.isAuthenticated() && req.user.role === 'admin') {
            const brand = new Brand(req.body);
            brand.save()
                .then(brand => {
                    res.json(mongooseToObject(brand));
                }).catch(err => {
                    res.status(500).json({ message: err.message });
                });
        } else {
            res.json({
                message: 'You are not authorized'
            });
        };
    }

    updateBrand(req, res) {
        if (req.isAuthenticated() && req.user.role === 'admin') {
            Brand.findByIdAndUpdate(req.params.id, req.body, { new: true })
                .then(brand => {
                    res.json(mongooseToObject(brand));
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

    deleteBrand(req, res) {
        if (req.isAuthenticated() && req.user.role === 'admin') {
            Brand.findByIdAndDelete(req.params.id)
                .then(brand => {
                    res.json({
                        message: 'Brand deleted successfully'
                    });
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
}

module.exports = new BrandController();
