const express = require('express')
const router = express.Router()

const orderController = require('../app/controllers/OrderController')

// order
router.get('/', orderController.list)  

// detail
router.get('/:id', orderController.detail)

// confirm
router.put('/:id', orderController.confirm)

module.exports = router;