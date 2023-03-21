const express = require('express')
const router = express.Router()

const cartController = require('../app/controllers/CartController')

router.get('/', cartController.cart)
router.post('/addCart', cartController.addCart)
router.get('/:id', cartController.detailPayment)
router.post('/payment', cartController.payment)

module.exports = router
