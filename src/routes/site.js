const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/UserController')

router.get('/editProfile', userController.editProfile)
router.post('/editProfile/:id', userController.update)

// tìm kiếm
router.get('/search', userController.search)
router.get('/history', userController.history)
router.get('/order', userController.order)

router.get('/', userController.home)

// lọc sản phẩm theo loại
router.get('/:slug', userController.filter)

module.exports = router
