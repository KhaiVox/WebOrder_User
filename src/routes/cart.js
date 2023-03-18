const express = require('express')
const router = express.Router()

const cartController = require('../app/controllers/CartController')

router.get('/', cartController.cart)
router.post('/addCart', cartController.addCart)
router.get('/:id', cartController.payment)

module.exports = router
