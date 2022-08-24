const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/order.controller');

//READ
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);

//CREATE
router.post('/', orderController.createOrder);

//UPDATE
router.put('/:id', orderController.updateOrder);
//cancel order
router.put('/:id/cancel', orderController.cancelOrder);

//DELETE
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
