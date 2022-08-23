const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/category.controller');

//READ
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);

//CREATE
router.post('/', categoryController.createCategory);

//UPDATE
router.put('/:id', categoryController.updateCategory);

//DELETE
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
