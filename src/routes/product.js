const express = require('express')
const router = express.Router()

const productController = require('../app/controllers/ProductController')

// index
router.get('/', productController.read)

// detail
router.get('/:id', productController.detail)

// create
router.post('/', productController.create)

// update
router.put('/:id', productController.update)

// delete
router.delete('/:id', productController.delete)

module.exports = router;