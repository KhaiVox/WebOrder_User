const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://khaiduchoa:4jOHcqMOG1bsYOJ2@cluster0.e8bk9pu.mongodb.net/WebOrder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const CartSchema = new Schema(
    {
        id_Cart: { type: String },
        id_DetailVoucher: { type: String },
        payment_Method: { type: String },
        receive_Method: { type: String },
        confirm_Order: { type: String },
        order_Status: { type: String },
        state: { type: Boolean },
        total: { type: Number },
        point: { type: Boolean },
        createAt: { type: Date, default: Date.now },
    },
    {
        collection: 'carts',
    },
)

const CartModel = mongoose.model('cart', CartSchema)
module.exports = CartModel
