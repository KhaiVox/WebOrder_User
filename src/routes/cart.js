const express = require('express')
const router = express.Router()

const cartController = require('../app/controllers/CartController')

// kiểm tra xem người dùng đã đăng nhập hay chưa
const checkLogin = (req, res, next) => {
    let token = req.cookies.token
    if (token) {
        next()
    } else {
        res.render('login')
    }
}

// giao diện giỏ hàng
router.get('/', checkLogin, cartController.cart)
router.get('/cartTotal', cartController.cartTotal)

// thêm vào giỏ
router.post('/addCart', checkLogin, cartController.addCart)

// chi tiết đơn hàng
router.get('/:id', checkLogin, cartController.detailPayment)

// thanh toán
router.post('/payment', checkLogin, cartController.payment)

// hủy đơn
router.post('/:id/cancel', checkLogin, cartController.cancel)

module.exports = router
