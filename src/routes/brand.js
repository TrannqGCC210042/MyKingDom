const express = require('express')
const router = express.Router()

const brandController = require('../app/controllers/BrandController')

// index
router.get('/', brandController.read) 

// create
router.post('/', brandController.create)

// get a brand
router.get('/:id', brandController.detail)

// update
router.put('/:id', brandController.update)

// delete
router.delete('/:id', brandController.delete)

module.exports = router;