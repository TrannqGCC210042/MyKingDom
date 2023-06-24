const express = require('express')
const router = express.Router()

const branchController = require('../app/controllers/BranchController')

// read
router.get('/', branchController.read)  

// create
router.post('/', branchController.create)

// get a branch
router.get('/:id', branchController.detail)

// update
router.put('/:id', branchController.update)

// delete
router.delete('/:id', branchController.delete)

module.exports = router;