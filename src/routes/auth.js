const express = require('express')
const router = express.Router()

const authController = require('../app/controllers/AuthController')

router.get('/login', authController.loginUI)
router.post('/login', authController.login)

router.get('/register', authController.registerUI)
// router.post('/register', authController.register)

module.exports = router
