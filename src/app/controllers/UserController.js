const Food = require('../models/product')
const Account = require('../models/account')
const Cart = require('../models/cart')

const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class UserController {
    // [GET] /user
    async home(req, res, next) {
        try {
            // kiểm tra thấy nếu token có giá trị sẽ cho phép truy cập vào trang HOME
            // sai sẽ trả về trang LOGIN
            var token = req.cookies.token
            if (token) {
                const foods = await Food.find()
                const user = await Account.findOne({ _id: token })

                const getCart = await Cart.findOne({ id_Account: token, state: true })
                const getDetailCart = getCart.detail_Cart

                const getFoodId = getDetailCart.map((item) => item.id_Food)
                const listFood = []
                const countFood = getFoodId.length
                for (let i of getFoodId) {
                    let food = await Food.find({ _id: i })
                    listFood.push(...food)
                }

                res.render('home', {
                    foods: mutipleMongooseToObject(foods),
                    user: mongooseToObject(user),
                    cart_info: mongooseToObject(getCart),
                    getFood: mutipleMongooseToObject(listFood),
                    getDetailCart,
                    countFood,
                })
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
    async cart(req, res, next) {
        try {
            // , state: true
            var token = req.cookies.token
            if (token) {
                const getCart = await Cart.findOne({ id_Account: token, state: true })
                const getDetailCart = getCart.detail_Cart

                const getFoodId = getDetailCart.map((item) => item.id_Food)
                const listFood = []
                const countFood = getFoodId.length
                for (let i of getFoodId) {
                    let food = await Food.find({ _id: i })
                    listFood.push(...food)
                }

                res.render('cart', {
                    cart_info: mongooseToObject(getCart),
                    getFood: mutipleMongooseToObject(listFood),
                    getDetailCart,
                    countFood,
                }).catch(next)
            } else {
                res.render('login')
            }
        } catch (error) {}
    }

    // [GET] /user/search
    search(req, res, next) {
        const textSearch = req.query.text

        Food.find({
            $or: [{ name: { $regex: textSearch } }],
        })
            .then((foods) => {
                if (foods == '') {
                    res.render('home', {
                        title: 'Không có sản phẩm nào !!',
                    })
                } else {
                    res.render('home', {
                        foods: mutipleMongooseToObject(foods),
                    })
                }
            })
            .catch((err) => {
                res.json('Đã xảy ra lỗi!')
            })
    }
}

module.exports = new UserController()
