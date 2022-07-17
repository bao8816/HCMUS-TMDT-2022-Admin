const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

//READ
// router.get('/upload-product', productController.uploadProductPage);
// router.get('/update-product', productController.updateProductPage);
router.get('/:id', productController.getProductById);
router.get('/', productController.getProducts);

//CREATE
router.post('/', productController.createProduct);

//UPDATE
router.put('/:id', productController.updateProduct);

//DELETE
router.delete('/:id', productController.deleteProduct);

module.exports = router;
