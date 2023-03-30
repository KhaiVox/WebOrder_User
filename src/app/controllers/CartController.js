const Food = require('../models/product')
const Account = require('../models/account')
const Cart = require('../models/cart')
const Payment = require('../models/payment')

const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class CartController {
    // [GET] /cart
    async cart(req, res, next) {
        try {
            let token = req.cookies.token
            if (token) {
                const getCart = await Cart.findOne({ id_Account: token, state: true })
                // .sort({ _id: -1 })
                if (getCart) {
                    const getDetailCart = getCart.detail_Cart

                    const getFoodId = getDetailCart.map((item) => item.id_Food)
                    const listFood = []
                    const countFood = getFoodId.length
                    for (let i of getFoodId) {
                        let food = await Food.find({ _id: i })
                        listFood.push(...food)
                    }

                    let count = 0
                    for (let element of getDetailCart) {
                        count += element.quantity
                    }

                    res.render('cart', {
                        cart_info: mongooseToObject(getCart),
                        getFood: mutipleMongooseToObject(listFood),
                        getDetailCart,
                        countFood,
                        count,
                    }).catch(next)
                } else {
                    res.render('cart', {
                        title: 'Chưa có sản phẩm.',
                        countFood: 0,
                    }).catch(next)
                }
            } else {
                res.render('login')
            }
        } catch (error) {}
    }

    // [POST] /cart/addCart
    async addCart(req, res, next) {
        let token = req.cookies.token
        const { id_Food, price } = req.body

        // chuyển đổi price thành kiểu number
        let priceConvert = parseInt(price)

        let cart = await Cart.findOne({ id_Account: token, state: true })
        if (cart) {
            // cập nhật sản phẩm trong giỏ và tổng tiền
            let detailCart = cart.detail_Cart
            let newTotal = cart.total + priceConvert

            // nếu sản phẩm đã có trong giỏ hàng sẽ cho tăng số lượng
            let duplicate = false
            for (let element of detailCart) {
                if (element.id_Food == id_Food) {
                    element.quantity += 1
                    duplicate = true
                }
            }

            if (!duplicate) {
                detailCart.push({ id_Food, quantity: 1, price: priceConvert })
            }
            await Cart.findOneAndUpdate(
                {
                    id_Account: token,
                    state: true,
                },
                { detail_Cart: detailCart, total: newTotal },
            )
            // res.json({ mssg: 'Đã cập nhật thành công!' })
            res.redirect('/user')
        }
        // Chưa có giỏ hàng sẽ tiến hành tạo mới
        else {
            const detail_Cart = []
            detail_Cart.push({ id_Food, quantity: 1, price: priceConvert })

            Cart.create({
                id_Account: token,
                detail_Cart,
                total: priceConvert,
                state: true,
            })
        }
    }

    // [GET] /cart/:id
    async detailPayment(req, res, next) {
        try {
            let token = req.cookies.token
            if (token) {
                const getCart = await Cart.findOne({ id_Account: token, state: true })

                const getDetailCart = getCart.detail_Cart
                const getFoodId = getDetailCart.map((item) => item.id_Food)
                const listFood = []
                for (let i of getFoodId) {
                    let food = await Food.find({ _id: i })
                    listFood.push(...food)
                }

                res.render('payment', {
                    getCart: mongooseToObject(getCart),
                    getFood: mutipleMongooseToObject(listFood),
                    getDetailCart,
                }).catch(next)
            } else {
                res.render('login')
            }
        } catch (error) {}
    }

    // [POST] /cart/payment
    async payment(req, res, next) {
        let token = req.cookies.token
        const { id_Cart, payment_Method, confirm_Order, order_Status, state } = req.body

        // reset lại giỏ hàng sau khi thanh toán
        const getCart = await Cart.findOneAndUpdate(
            {
                id_Account: token,
                state: true,
            },
            { state: false },
        )

        let totalPayment = getCart.total

        await Payment.create({
            id_Cart,
            payment_Method,
            confirm_Order,
            order_Status,
            total: totalPayment,
            state,
        })
            .then(() => res.redirect('/user/order'))
            .catch(next)
    }

    // [POST] /cancel/:id
    cancel(req, res, next) {
        Payment.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/user/order'))
            .catch(next)
    }
}

module.exports = new CartController()
