const Order = require('../models/order.model');
const { multipleMongooseToObject } = require('../../utils/mongoose');
const { mongooseToObject } = require('../../utils/mongoose');

class OrderController {
    getOrders(req, res) {
        if (req.isAuthenticated()) {
            Order.find({})
                .then(orders => {
                    res.json(multipleMongooseToObject(orders));
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
    
    getOrderById(req, res) {
        if (req.isAuthenticated()) {
            Order.findById(req.params.id)
                .then(order => {
                    res.json(mongooseToObject(order));
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

    createOrder(req, res) {
        if (req.isAuthenticated()) {
            const order = new Order(req.body);
            order.save()
                .then(order => {
                    res.json(mongooseToObject(order));
                }).catch(err => {
                    res.status(500).json({ message: err.message });
                });
        } else {
            res.json({
                message: 'You are not authorized'
            });
        };
    }

    updateOrder(req, res) {
        if (req.isAuthenticated()) {
            Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
                .then(order => {
                    res.json(mongooseToObject(order));
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

    deleteOrder(req, res) {
        if (req.isAuthenticated()) {
            Order.findByIdAndDelete(req.params.id)
                .then(() => {
                    res.json({
                        message: 'Order deleted successfully'
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

module.exports = new OrderController();
