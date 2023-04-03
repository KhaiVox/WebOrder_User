const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/UserController')

// kiểm tra xem người dùng đã đăng nhập hay chưa
const checkLogin = (req, res, next) => {
    let token = req.cookies.token
    if (token) {
        next()
    } else {
        res.render('login')
    }
}

// thông tin cá nhân
router.get('/editProfile', checkLogin, userController.editProfile)
router.post('/editProfile/:id', checkLogin, userController.update)

// tìm kiếm
router.get('/search', checkLogin, userController.search)

// lịch sử
router.get('/history', checkLogin, userController.history)

// trạng thái đơn hàng
router.get('/order', checkLogin, userController.order)

router.get('/', checkLogin, userController.home)

// lọc sản phẩm theo loại
router.get('/:slug', checkLogin, userController.filter)

module.exports = router
