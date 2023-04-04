const express = require('express')
const router = express.Router()

const passport = require('passport')

const authController = require('../app/controllers/AuthController')

// kiểm tra thông tin đúng hay chưa
// nếu có sẽ trả về thông tin User
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

router.get('/login', authController.loginUI)
router.post('/login', authController.login)

router.get('/register', authController.registerUI)
router.post('/register', authController.register)

// gửi thông tin đến GG để kiểm tra thông tin User
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get(
    '/google/callback',
    passport.authenticate('google', {
        // Xử lý đăng nhập thành công
        successRedirect: '/auth/registerGoogle',
        failureRedirect: '/auth/login',
    }),
)

// xử lí sau khi xác nhận thông tin User thành công
router.get('/registerGoogle', isLoggedIn, authController.registerGoogle)

module.exports = router
