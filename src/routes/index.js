const userRouter = require('./site')
const authRouter = require('./auth')
const cartRouter = require('./cart')

// nếu các tuyến đường bên trên ko match -> chạy tuyến đường bên dưới cùng
function route(app) {
    app.use('/cart', cartRouter)
    app.use('/user', userRouter)
    app.use('/auth', authRouter)
}

module.exports = route
