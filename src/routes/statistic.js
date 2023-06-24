const express = require('express')
const router = express.Router()

const statisticController = require('../app/controllers/StatisticController')

// List
router.get('/', statisticController.list)

// Chart
router.get('/chart', statisticController.chart)

module.exports = router;