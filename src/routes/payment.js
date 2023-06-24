const express = require('express')
const router = express.Router()

const paymentController = require('../app/controllers/PaymentController')

// payment
router.get('/', paymentController.list)  

// payment
router.post('/save', paymentController.save)  

module.exports = router;