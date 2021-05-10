const express = require('express')
const orderController = require('./orderController')

const router = express.Router()

router.post('', orderController.postOrder)

module.exports = router
