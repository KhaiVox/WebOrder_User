const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/UserController')

// thông tin cá nhân
router.get('/editProfile', userController.editProfile)
router.post('/editProfile/:id', userController.update)

// tìm kiếm
router.get('/search', userController.search)

// lịch sử
router.get('/history', userController.history)

// trạng thái đơn hàng
router.get('/order', userController.order)

router.get('/', userController.home)

// lọc sản phẩm theo loại
router.get('/:slug', userController.filter)

module.exports = router
