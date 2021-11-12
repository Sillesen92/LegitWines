const express = require('express')
const path = require('path')
const baseRoute = require('../routes/baseRoute.js')
const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 3600
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(express.json())
app.use(session({secret: 'ADCC58BA-6703-4795-B94D-6C562784DAEB', saveUninitialized: true, resave: true}))

//app.use(baseRoute)


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))