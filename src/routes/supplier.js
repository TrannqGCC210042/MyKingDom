const express = require('express')
const router = express.Router()

const supplierController = require('../app/controllers/SupplierController')

// read
router.get('/', supplierController.read)

// create
router.post('/', supplierController.create)

// get a supplier
router.get('/:id', supplierController.detail)

// update
router.put('/:id', supplierController.update)

// delete
router.delete('/:id', supplierController.delete)

// search
// router.get('/search/:name', supplierController.search)

module.exports = router;