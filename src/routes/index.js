const userRouter = require('./home')

// nếu các tuyến đường bên trên ko match -> chạy tuyến đường bên dưới cùng
function route(app) {
    app.use('/user', userRouter)
}

module.exports = route
