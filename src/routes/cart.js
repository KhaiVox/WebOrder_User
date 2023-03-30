const express = require('express')
const router = express.Router()

const cartController = require('../app/controllers/CartController')

// giao diện giỏ hàng
router.get('/', cartController.cart)

// thêm vào giỏ
router.post('/addCart', cartController.addCart)

// chi tiết đơn hàng
router.get('/:id', cartController.detailPayment)

// thanh toán
router.post('/payment', cartController.payment)

// hủy đơn
router.post('/:id/cancel', cartController.cancel)

module.exports = router
