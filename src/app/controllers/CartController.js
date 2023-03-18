const Food = require('../models/product')
const Account = require('../models/account')
const Cart = require('../models/cart')

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

    // [POST] /cart/addCart
    async addCart(req, res, next) {
        var token = req.cookies.token
        const { id_Food, price } = req.body

        let cart = await Cart.findOne({ id_Account: token })
        let detailCart = cart.detail_Cart
        // const check = detailCart.find((cart) => cart.id_Food === id_Food)
        // for (let i of detailCart) {
        //     const check = detailCart.find((cart) => cart.id_Food === i.id_Food)
        //     if (check) {
        //         return console.log('trung roi')
        //     } else {
        //         // detailCart.push({ id_Food, quantity: 1, price })
        //         return console.log('khong trung')
        //     }
        // }

        detailCart.push({ id_Food, quantity: 1, price })
        await Cart.findOneAndUpdate(
            {
                id_Account: token,
            },
            { detail_Cart: detailCart },
        )
        res.redirect('/user')
    }

    // [GET] /cart/:id/payment
    async payment(req, res, next) {
        res.render('payment')
        // const getOrder = await Payment.findOne({ _id: req.params.id })
        // const getCartID = getOrder.id_Cart
        // const getCart = await Order.findOne({ _id: getCartID })
        // const getCustomerID = getCart.id_Account
        // const getCustomer = await Customer.findOne({ _id: getCustomerID })
        // const getDetailCart = getCart.detail_Cart
        // const getFoodId = getDetailCart.map((item) => item.id_Food)
        // const listFood = []
        // for (let i of getFoodId) {
        //     let food = await Food.find({ _id: i })
        //     listFood.push(...food)
        // }
        // res.render('historys/detail', {
        //     index: index,
        //     getOrder: mongooseToObject(getOrder),
        //     getCart: mongooseToObject(getCart),
        //     getCustomer: mongooseToObject(getCustomer),
        //     getFood: mutipleMongooseToObject(listFood),
        //     getDetailCart,
        // })
    }
}

module.exports = new CartController()
