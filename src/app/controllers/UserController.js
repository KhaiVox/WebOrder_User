const Food = require('../models/product')

const { mutipleMongooseToObject } = require('../../util/mongoose')

class UserController {
    // [GET] /user
    home(req, res, next) {
        // Promise.all([Food.countDocuments(), Food.find()])
        //     .then(([quantity, foods]) => {
        //         res.render('user', {
        //             quantity,
        //             index: 1,
        //             foods: mutipleMongooseToObject(foods),
        //         })
        //     })
        //     .catch(next)

        try {
            // kiểm tra thấy nếu token có giá trị sẽ cho phép truy cập vào trang HOME
            // sai sẽ trả về trang LOGIN
            var token = req.cookies.token
            if (token) {
                Food.find({})
                    .then((foods) =>
                        res.render('home', {
                            foods: mutipleMongooseToObject(foods),
                        }),
                    )
                    .catch(next)
            } else {
                res.render('login')
            }
        } catch (error) {
        }

        // Food.find({})
        //     .then((foods) =>
        //         res.render('home', {
        //             foods: mutipleMongooseToObject(foods),
        //         }),
        //     )
        //     .catch(next)
    }

    // [GET] /user/filter
    filter(req, res, next) {
        // có thể tạo biến if để lấy giá trị req.params.slug = tiếng việt
        // Promise.all([Food.find({ type: req.params.slug }).countDocuments(), Food.find({ type: req.params.slug })]).then(
        //     ([quantity, foods]) => {
        //         res.render('foods', {
        //             quantity,
        //             foods: mutipleMongooseToObject(foods),
        //         })
        //     },
        // )

        Food.find({ type: req.params.slug })
            .then((foods) =>
                res.render('home', {
                    foods: mutipleMongooseToObject(foods),
                }),
            )
            .catch(next)
    }
}

module.exports = new UserController()
