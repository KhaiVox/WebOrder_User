const Food = require('../models/product')
const Account = require('../models/account')
const Cart = require('../models/cart')
const Payment = require('../models/payment')

const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class CartController {
    // [PUT] /cart
    async cart(req, res, next) {
        try {
            // , state: true
            var token = req.cookies.token
            if (token) {
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

                    res.render('cart', {
                        cart_info: mongooseToObject(getCart),
                        getFood: mutipleMongooseToObject(listFood),
                        getDetailCart,
                        countFood,
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
        var token = req.cookies.token
        const { id_Food, price } = req.body

        let cart = await Cart.findOne({ id_Account: token })
        let detailCart = cart.detail_Cart

        let duplicate = false
        for (let element of detailCart) {
            if (element.id_Food == id_Food) {
                element.quantity += 1
                duplicate = true
            }
        }
        if (!duplicate) {
            detailCart.push({ id_Food, quantity: 1, price })
        }

        await Cart.findOneAndUpdate(
            {
                id_Account: token,
            },
            { detail_Cart: detailCart },
        )
        res.redirect('/user')
    }

    // [GET] /cart/:id
    async detailPayment(req, res, next) {
        try {
            var token = req.cookies.token
            if (token) {
                const getCart = await Cart.findOne({ id_Account: token, state: true })
                const getCartID = getCart._id

                const getDetailCart = getCart.detail_Cart
                const getFoodId = getDetailCart.map((item) => item.id_Food)
                const listFood = []
                for (let i of getFoodId) {
                    let food = await Food.find({ _id: i })
                    listFood.push(...food)
                }

                const payment = await Payment.findOne({ id_Cart: getCartID })

                // res.json(payment.)
                res.render('payment', {
                    getCart: mongooseToObject(getCart),
                    getFood: mutipleMongooseToObject(listFood),
                    getPayment: mongooseToObject(payment),
                    getDetailCart,
                }).catch(next)

                // const getOrder = await Payment.findOne({ _id: req.params.id })
                // const getCart = await Order.findOne({ _id: getCartID })
                // const getCustomerID = getCart.id_Account
                // const getCustomer = await Customer.findOne({ _id: getCustomerID })

                // res.render('historys/detail', {
                //     index: index,
                //     getOrder: mongooseToObject(getOrder),
                //     getCart: mongooseToObject(getCart),
                //     getCustomer: mongooseToObject(getCustomer),
                // })
            } else {
                res.render('login')
            }
        } catch (error) {}
    }

    // [GET] /cart/payment
    async payment(req, res, next) {
        res.json(req.body)
    }
}

module.exports = new CartController()
