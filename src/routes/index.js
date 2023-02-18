const userRouter = require('./home')
const authRouter = require('./auth')

// nếu các tuyến đường bên trên ko match -> chạy tuyến đường bên dưới cùng
function route(app) {
    app.use('/user', userRouter)
    app.use('/auth', authRouter)
}

module.exports = route
