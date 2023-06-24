const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/UserController')

// profile
router.get('/profile', userController.profile)  

// update
router.put('/update', userController.update)

// history
router.get('/history', userController.history)

// purchase
router.get('/purchase', userController.purchase)

// change password
router.put('/change-password', userController.changePassword)

// forgot password
router.post('/forgot-password', userController.forgotPassword);

module.exports = router;