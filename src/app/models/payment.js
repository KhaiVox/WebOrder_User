const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://khaiduchoa:4jOHcqMOG1bsYOJ2@cluster0.e8bk9pu.mongodb.net/WebOrder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const PaymentSchema = new Schema(
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
        createdAt: { type: Date, default: Date.now },
    },
    {
        collection: 'payments',
    },
)

const PaymentModel = mongoose.model('payment', PaymentSchema)
module.exports = PaymentModel
