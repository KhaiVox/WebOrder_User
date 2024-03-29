const Account = require('../models/account')

class AuthController {
    // [GET] /auth/login
    loginUI(req, res, next) {
        res.render('login')
    }

    // [POST] /auth/login
    login(req, res, next) {
        let username = req.body.username
        let password = req.body.password

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
        let username = req.body.username
        let password = req.body.password
        let phone = req.body.phone
        let address = req.body.address
        let fullname = req.body.fullname

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
                        avatar: '',
                        deleted: false,
                    }).then((data) => {
                        res.redirect('login')
                    })
                }
            })
            .catch((err) => {
                res.status(500).json('Tạo tài khoản thất bại!')
            })
    }

    // [GET] /auth/google
    google(req, res, next) {
        console.log(req.user)
    }

    // [POST] /auth/registerGoogle
    registerGoogle(req, res, next) {
        let fullname = req.user.displayName
        let username = req.user.displayName
        let phone = ''
        let address = ''
        let avatar = ''

        // tạo pass ngẫu nhiên gồm 15 số
        let password = ''
        for (let i = 0; i < 15; i++) {
            password += Math.floor(Math.random() * 10)
        }

        // kiểm tra nếu người dùng đã có tài khoản chưa
        Account.findOne({
            username: username,
        })
            .then((data) => {
                if (data) {
                    // nếu có rồi sẽ setCookie và đăng nhập vào
                    res.cookie('token', data._id)
                    res.redirect('/user')
                } else {
                    // nếu chưa đó sẽ tạo mới và cho phép đăng nhập vào
                    Account.create({
                        fullname: fullname,
                        username: username,
                        password: password,
                        phone: phone,
                        address: address,
                        avatar: avatar,
                        deleted: false,
                    }).then((data) => {
                        res.cookie('token', data._id)
                        res.redirect('/user')
                    })
                }
            })
            .catch((err) => {
                res.status(500).json('Tạo tài khoản thất bại!')
            })
    }
}

module.exports = new AuthController()
