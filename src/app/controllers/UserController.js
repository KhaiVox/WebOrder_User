const Product = require('../models/product')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class UserController {
    // [GET] /user
    home(req, res, next) {
        // res.render('homeUser')

        // Promise.all([Food.countDocuments(), Food.find()])
        //     .then(([quantity, foods]) => {
        //         res.render('user', {
        //             quantity,
        //             index: 1,
        //             foods: mutipleMongooseToObject(foods),
        //         })
        //     })
        //     .catch(next)

        Product.find({})
            .then((products) =>
                res.render('home', {
                    products: mutipleMongooseToObject(products),
                }),
            )
            .catch(next)
    }
}

module.exports = new UserController()
