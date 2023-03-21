const Account = require('../models/account')

class AuthController {
    // [GET] /auth/login
    loginUI(req, res, next) {
        res.render('login')
    }

    // [POST] /auth/login
    login(req, res, next) {
        var username = req.body.username
        var password = req.body.password

        Account.findOne({
            username: username,
            password: password,
        })
            .then((data) => {
                if (data) {
                    let token = data._id
                    res.json({
                        message: 'Thành công',
                        token: token,
                    })
                } else {
                    res.json('Tài khoản hoặc mật khẩu chưa chính xác!')
                }
            })
            .catch((err) => {
                res.json('Đã xảy ra lỗi!')
            })
    }

    // [GET] /auth/register
    registerUI(req, res, next) {
        res.render('register')
    }

    // [POST] /auth/register
    register(req, res, next) {
        var username = req.body.username
        var password = req.body.password
        var phone = req.body.phone
        var address = req.body.address
        var fullname = req.body.fullname

        Account.findOne({
            username: username,
        })
            .then((data) => {
                if (data) {
                    res.json('User này đã tồn tại!')
                } else {
                    Account.create({
                        username: username,
                        password: password,
                        phone: phone,
                        address: address,
                        fullname: fullname,
                        deleted: false,
                    }).then((data) => {
                        res.json('Tạo tài khoản thành công!')
                    })
                }
            })
            .catch((err) => {
                res.status(500).json('Tạo tài khoản thất bại!')
            })
    }
}

module.exports = new AuthController()
