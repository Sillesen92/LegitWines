/*------------------Imports------------------*/
const express = require('express')
const path = require('path')
const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 3600
/*------------------Imports End------------------*/

/*------------------Middleware------------------*/
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(session({ secret: 'ADCC58BA-6703-4795-B94D-6C562784DAEB', saveUninitialized: true, resave: true }))


/*------------------Middleware End------------------*/


/*------------------Routes------------------*/
const baseRoute = require('../routes/baseRoute.js')
app.use(baseRoute)
const editBookingRoute = require('../routes/editBookingRoute.js')
app.use(editBookingRoute)
const createPartnerRoute = require('../routes/createPartnerRoute.js')
app.use(createPartnerRoute)
const editPartnerRoute = require('../routes/editPartnerRoute.js')
app.use(editPartnerRoute)
const createBookingRoute = require('../routes/createBookingRoute.js')
app.use(createBookingRoute)
const loginRoute = require('../routes/loginRoute.js')
app.use(loginRoute)
const createSalesmanRoute = require('../routes/createSalesmanRoute.js')
const { url } = require('inspector')
app.use(createSalesmanRoute)
const salesStatsRoute = require('../routes/salesStatRoute')
app.use(salesStatsRoute)

const salesStatsRoute = require('../routes/salesStatRoute.js')
app.use(salesStatsRoute);

/*------------------Routes End------------------*/

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))