const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://khaiduchoa:4jOHcqMOG1bsYOJ2@cluster0.e8bk9pu.mongodb.net/WebOrder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const CartSchema = new Schema(
    {
        id_Account: { type: String },
        detail_Cart: { type: Array },
        total: { type: Number },
        state: { type: Boolean },
        createAt: { type: Date, default: Date.now },
    },
    {
        collection: 'carts',
    },
)

const CartModel = mongoose.model('cart', CartSchema)
module.exports = CartModel
