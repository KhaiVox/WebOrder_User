const express = require('express')
const router = express.Router()

const cartController = require('../app/controllers/CartController')

// giao diện giỏ hàng
router.get('/', cartController.cart)

// thêm vào giỏ
router.post('/addCart', cartController.addCart)

// chi tiết dơn hàng
router.get('/:id', cartController.detailPayment)

// thanh toán
router.post('/payment', cartController.payment)

module.exports = router
