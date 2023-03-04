const Food = require('../models/product')
const Account = require('../models/account')
const Cart = require('../models/cart')

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
                Promise.all([Food.find(), Account.findOne({ _id: token })])
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
        } catch (error) {}
    }

    // [GET] /user/filter
    filter(req, res, next) {
        try {
            var token = req.cookies.token
            if (token) {
                Promise.all([Food.find({ type: req.params.slug }), Account.findOne({ _id: token })])
                    .then(([foods, user]) => {
                        res.render('home', {
                            foods: mutipleMongooseToObject(foods),
                            user: mongooseToObject(user),
                        })
                    })
                    .catch(next)

                // Food.find({ type: req.params.slug })
                //     .then((foods) =>
                //         res.render('home', {
                //             foods: mutipleMongooseToObject(foods),
                //         }),
                //     )
                //     .catch(next)
            } else {
                res.render('login')
            }
        } catch (error) {}
    }

    // [GET] /user/register
    editProfile(req, res, next) {
        try {
            var token = req.cookies.token
            if (token) {
                Account.findOne({ _id: token })
                    .then((user) => {
                        res.render('editProfile', { user: mongooseToObject(user) })
                    })
                    .catch(next)
            } else {
                res.render('login')
            }
        } catch (error) {}
    }

    // [PUT] /user/editProfile/:id
    update(req, res, next) {
        Account.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/user/editProfile'))
            .catch(next)
    }

    // [PUT] /user/cart
    cart(req, res, next) {
        try {
            // , state: true
            var token = req.cookies.token
            if (token) {
                Cart.findOne({ id_Account: token, state: true })
                    .then((cart) => {
                        res.render('cart', { cart_info: mongooseToObject(cart) })
                        // res.json(cart)
                    })
                    .catch(next)
            } else {
                res.render('login')
            }
        } catch (error) {}
    }
}

module.exports = new UserController()
