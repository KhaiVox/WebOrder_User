const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://khaiduchoa:4jOHcqMOG1bsYOJ2@cluster0.e8bk9pu.mongodb.net/WebOrder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const AccountSchema = new Schema(
    {
        username: String,
        password: String,
        fullname: String,
        address: String,
        phone: String,
        avatar: String,
        deleted: Boolean
    },
    {
        collection: 'account_users',
    },
)

const AccountModel = mongoose.model('account', AccountSchema)
module.exports = AccountModel
