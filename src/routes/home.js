const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/UserController')

// lọc sản phẩm theo loại
router.get('/:slug', userController.filter)

// router.post('/login', userController.login)
router.get('/', userController.home)

module.exports = router
