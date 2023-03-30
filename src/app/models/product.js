const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://khaiduchoa:4jOHcqMOG1bsYOJ2@cluster0.e8bk9pu.mongodb.net/WebOrder', {
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
        deleted: { type: Boolean },
    },
    {
        collection: 'foods',
    },
)

const ProductModel = mongoose.model('Product', Product)
module.exports = ProductModel
