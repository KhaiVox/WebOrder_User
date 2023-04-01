var path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()

// Session express
const session = require('express-session')
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: 'somesecret',
    }),
)

// Thư viện PUT, PATCH
const methodOverride = require('method-override')
const port = 3002

var cookieParser = require('cookie-parser')
app.use(cookieParser())

// Body parse
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

// dùng khi muốn sử dụng method="PUT" cho việc edit sản phẩm
app.use(methodOverride('_method'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Models
// const AccountModel = require('./admin/app/models/account')

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
)

app.set('views', path.join(__dirname, 'resources', 'views'))

app.set('view engine', 'hbs')

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}/user`)
})

app.get('/', (req, res) => {
    res.render('home')
})

// Log out
app.get('/deleteCookie', function (req, res, next) {
    let cookie = req.cookies
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue
        }
        res.cookie(prop, '', { expires: new Date(0) })
    }
    res.redirect('/auth/login')
})

// Nhận các route sau đó sử dụng (luôn để dưới cùng)
const route = require('./routes')
route(app)
