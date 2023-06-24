const express = require('express')
const router = express.Router()

const cartController = require('../app/controllers/CartController')

// profile
router.get('/', cartController.cart)  

// add to cart
router.post('/', cartController.save)  

// update to cart
router.post('/update', cartController.update)  

// delete to cart
router.post('/delete', cartController.delete)  

module.exports = router;