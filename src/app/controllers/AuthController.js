const AccountModel = require('../models/account')

class AuthController {
    // [POST] /auth/login
    login(req, res, next) {
        // res.render('home')
        // res.json('thanh cong')
        var username = req.body.username
        var password = req.body.password

        AccountModel.findOne({
            username: username,
            password: password,
        })
            .then((data) => {
                if (data) {
                    let token = password
                    //  jwt.sign(
                    //     {
                    //         _id: data._id,
                    //         admin: true,
                    //     },
                    //     'mk',
                    // )
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
}

module.exports = new AuthController()
