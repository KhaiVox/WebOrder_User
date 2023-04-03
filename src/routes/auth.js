const express = require('express')
const router = express.Router()

const passport = require('passport')

const authController = require('../app/controllers/AuthController')

router.get('/login', authController.loginUI)
router.post('/login', authController.login)

router.get('/register', authController.registerUI)
router.post('/register', authController.register)

router.post('/google', passport.authenticate('google-plus-token'), authController.google)

module.exports = router
