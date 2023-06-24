const express = require('express')
const router = express.Router()
const siteController = require('../app/controllers/SiteController')

// home
router.get('/', siteController.home) 
// router.get('/:slug', siteController.show) 

// shop
router.get('/shop', siteController.shop) 

// detail
router.get('/detail/:id', siteController.detail)

// about
router.get('/about', siteController.about) 

// contact
router.get('/contact', siteController.contact)

// contact
router.post('/contact', siteController.saveContact)

// logout
router.get('/logout', siteController.logout)

module.exports = router;