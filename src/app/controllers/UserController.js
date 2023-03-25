const Food = require('../models/product')
const Account = require('../models/account')
const Cart = require('../models/cart')
const Payment = require('../models/payment')

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
                if (getCart) {
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
                    res.render('home', {
                        foods: mutipleMongooseToObject(foods),
                        user: mongooseToObject(user),
                        countFood: 0,
                        notifyEmpty: 'Chưa có sản phẩm.',
                    })
                }
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
            } else {
                res.render('login')
            }
        } catch (error) {}
    }

    // [GET] /user/editProfile
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
    async update(req, res, next) {
        var token = req.cookies.token

        Account.updateOne({ id_Account: token }, req.body)
            .then(() => res.redirect('/user/editProfile'))
            .catch(next)
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
                        title: 'Không có sản phẩm !!!',
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

    // [GET] /user/history
    async history(req, res, next) {
        const getPayment = await Payment.find({ $or: [{ order_Status: 'Hoàn tất' }, { order_Status: 'Đã hủy' }] })
        // const getPaymentSuccess = await Payment.find({ order_Status: 'Hoàn tất' })
        // let totalRevenue = 0

        // getPaymentSuccess.map((item) => {
        //     totalRevenue += item.total
        // })
        // getPayment.map((item) => {
        //     const getCart.pu = item
        // })

        res.json(getCart)

        // res.render('history', {
        //     getPayment: mutipleMongooseToObject(getPayment),
        //     // totalRevenue,
        // })
    }
}

module.exports = new UserController()
