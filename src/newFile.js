const express = require('express')
const { app } = require('./index')

app.use(
    express.urlencoded({
        extended: true,
    }),
)
