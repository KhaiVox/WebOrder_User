const Food = require('../models/product')
const Account = require('../models/account')
const Cart = require('../models/cart')
const Payment = require('../models/payment')

const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose')

class UserController {
    // [GET] /user
    async home(req, res, next) {
        try {
            // kiểm tra thấy nếu token có giá trị sẽ cho phép truy cập vào trang HOME
            // sai sẽ trả về trang LOGIN
            let token = req.cookies.token

            if (token) {
                const foods = await Food.find({ deleted: false })
                const user = await Account.findOne({ _id: token })

                // set session id_Account
                req.session.user = user
                const detailUser = req.session.user

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

                    // set session tổng số món trong đơn hàng
                    req.session.countFood = countFood

                    res.render('home', {
                        foods: mutipleMongooseToObject(foods),
                        user: mongooseToObject(detailUser),
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
            let token = req.cookies.token
            let user = req.session.user
            let countFood = req.session.countFood

            if (token) {
                Food.find({ type: req.params.slug, deleted: false }).then((foods) => {
                    res.render('home', {
                        foods: mutipleMongooseToObject(foods),
                        user,
                        countFood,
                    })
                })
            } else {
                res.render('login')
            }
        } catch (error) {}
    }

    // [GET] /user/editProfile
    editProfile(req, res, next) {
        try {
            let token = req.cookies.token
            let countFood = req.session.countFood

            if (token) {
                Account.findOne({ _id: token })
                    .then((user) => {
                        res.render('editProfile', { user: mongooseToObject(user), countFood })
                    })
                    .catch(next)
            } else {
                res.render('login')
            }
        } catch (error) {}
    }

    // [PUT] /user/editProfile/:id
    async update(req, res, next) {
        let token = req.cookies.token
        await Account.findByIdAndUpdate(token, req.body)
            .then(() => res.redirect('/user/editProfile'))
            .catch(next)
    }

    // [GET] /user/search
    search(req, res, next) {
        const textSearch = req.query.text
        let user = req.session.user
        let countFood = req.session.countFood

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
                        user,
                        countFood,
                    })
                }
            })
            .catch((err) => {
                res.json('Đã xảy ra lỗi!')
            })
    }

    // [GET] /user/order
    async order(req, res, next) {
        try {
            let token = req.cookies.token
            let user = req.session.user
            let countFood = req.session.countFood

            // nếu k có cart mới cho vào đây
            if (token) {
                const getCart = await Cart.find({ id_Account: token, state: false })
                const lastCart = getCart[getCart.length - 1]
                const idLastCart = lastCart._id
                const getPayment = await Payment.findOne({ id_Cart: idLastCart })
                const stateOrder = getPayment.order_Status

                if (getPayment) {
                    const getDetailCart = lastCart.detail_Cart
                    const getFoodId = getDetailCart.map((item) => item.id_Food)
                    const listFood = []
                    for (let i of getFoodId) {
                        let food = await Food.find({ _id: i })
                        listFood.push(...food)
                    }

                    res.render('order', {
                        lastCart: mongooseToObject(lastCart),
                        getFood: mutipleMongooseToObject(listFood),
                        getPayment: mongooseToObject(getPayment),
                        getDetailCart,
                        stateOrder,
                        user,
                        countFood,
                    }).catch(next)
                } else {
                    res.render('order', {
                        title: 'Bạn chưa đặt đơn hàng nào.',
                        countFood: 0,
                    }).catch(next)
                }
            } else {
                res.render('login')
            }
        } catch (error) {}
    }

    // [GET] /user/history
    async history(req, res, next) {
        try {
            let token = req.cookies.token
            let user = req.session.user
            let countFood = req.session.countFood

            if (token) {
                const getOrderUser = await Cart.find({ id_Account: token, state: false })

                let countOrder = 0
                let totalOrder = 0
                let listOrderUser = []
                let listOrderSuccess = []
                for (let i of getOrderUser) {
                    // tìm ra những đơn đã hoàn tất or đã hủy
                    const getPayment = await Payment.findOne({
                        id_Cart: i._id,
                        $or: [{ order_Status: 'Hoàn tất' }, { order_Status: 'Đã hủy' }],
                    })

                    // đếm tổng đơn đã đặt và lấy ra lịch sử các đơn
                    if (getPayment) {
                        countOrder++
                        listOrderUser.push(getPayment)
                    }

                    // lấy danh sách đơn thành công
                    const getPaymentSuccess = await Payment.findOne({ id_Cart: i._id, order_Status: 'Hoàn tất' })
                    if (getPaymentSuccess) {
                        listOrderSuccess.push(getPaymentSuccess)
                    }
                }

                // tính tổng tiền đơn thành công
                for (let i of listOrderSuccess) {
                    totalOrder += i.total
                }

                res.render('history', {
                    countOrder,
                    totalOrder,
                    listOrderUser: mutipleMongooseToObject(listOrderUser),
                    user,
                    countFood,
                }).catch(next)
            } else {
                res.render('login')
            }
        } catch (error) {}
    }
}

module.exports = new UserController()
