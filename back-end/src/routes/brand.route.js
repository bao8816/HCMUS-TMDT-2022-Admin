const express = require('express');
const router = express.Router();
const brandController = require('../app/controllers/brand.controller');

//READ
router.get('/', brandController.getBrands);
router.get('/:id', brandController.getBrandById);

//CREATE
router.post('/', brandController.createBrand);

//UPDATE
router.put('/:id', brandController.updateBrand);

//DELETE
router.delete('/:id', brandController.deleteBrand);

module.exports = router;
