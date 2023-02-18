const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://khaiduchoa:wPa%40.GDk_NF4!de@cluster0.e8bk9pu.mongodb.net/WebOrder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const Product = new Schema(
    {
        id: String,
        name: { type: String, required: true },
        img: { type: String },
        type: { type: String },
        price: { type: String },
    },
    {
        collection: 'foods',
    },
)

const ProductModel = mongoose.model('Product', Product)
module.exports = ProductModel
