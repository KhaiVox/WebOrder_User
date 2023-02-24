const Food = require('../models/product')
const Account = require('../models/account')

const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')



class UserController {
    // [GET] /user
    home(req, res, next) {
        try {     
            // kiểm tra thấy nếu token có giá trị sẽ cho phép truy cập vào trang HOME
            // sai sẽ trả về trang LOGIN
            var token = req.cookies.token
            if (token) {
                Promise.all([Food.find(), Account.findOne({_id: token})])
                    .then(([foods, user]) => {
                        res.render('home', {
                            foods: mutipleMongooseToObject(foods), 
                            user: mongooseToObject(user), 
                        })
                    })
                    .catch(next)
            } else {
                res.render('login')
            }
        } catch (error) {
        }
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

    // [GET] /user/register
    editProfile(req, res, next) {
        try {     
            var token = req.cookies.token
            if (token) {
                var token = req.cookies.token
                Account.findOne({ _id: token })
                    .then((user) => {
                        res.render('editProfile', { user: mongooseToObject(user)})
                    })
                    .catch(next)
            } else {
                res.render('login')
            }
        } catch (error) {
        }
    }
}

module.exports = new UserController()
