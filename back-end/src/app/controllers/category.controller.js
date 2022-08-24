const Category = require('../models/category.model');
const { multipleMongooseToObject } = require('../../utils/mongoose');
const { mongooseToObject } = require('../../utils/mongoose');

class CategoryController {
    getCategories(req, res) {
        if (req.isAuthenticated()) {
            Category.find({})
                .then(categories => {
                    res.json(multipleMongooseToObject(categories));
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
    
    getCategoryById(req, res) {
        if (req.isAuthenticated()) {
            Category.findById(req.params.id)
                .then(category => {
                    res.json(mongooseToObject(category));
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
    
    createCategory(req, res) {
        if (req.isAuthenticated() && req.user.role === 'admin') {
            const category = new Category(req.body);
            category.save()
                .then(category => {
                    res.json(mongooseToObject(category));
                }).catch(err => {
                    res.status(500).json({ message: err.message });
                });
        } else {
            res.json({
                message: 'You are not authorized'
            });
        };
    }
    
    updateCategory(req, res) {
        if (req.isAuthenticated() && req.user.role === 'admin') {
            Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
                .then(category => {
                    res.json(mongooseToObject(category));
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

    deleteCategory(req, res) {
        if (req.isAuthenticated() && req.user.role === 'admin') {
            Category.findByIdAndRemove(req.params.id)
                .then(() => {
                    res.json({
                        message: 'Category deleted successfully'
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

module.exports = new CategoryController();
