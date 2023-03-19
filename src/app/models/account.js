const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://khaiduchoa:4jOHcqMOG1bsYOJ2@cluster0.e8bk9pu.mongodb.net/WebOrder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const AccountSchema = new Schema(
    {
        username: { type: String },
        password: { type: String },
        fullname: { type: String },
        address: { type: String },
        phone: { type: String },
        avatar: { type: String },
        deleted: { type: Boolean },
        createAt: { type: Date, default: Date.now },
    },
    {
        collection: 'account_users',
    },
)

const AccountModel = mongoose.model('account', AccountSchema)
module.exports = AccountModel
