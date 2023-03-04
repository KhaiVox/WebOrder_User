const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/UserController')

router.get('/editProfile', userController.editProfile)
router.put('/editProfile/:id', userController.update)

router.get('/cart', userController.cart)

router.get('/', userController.home)

// lọc sản phẩm theo loại
router.get('/:slug', userController.filter)

module.exports = router
