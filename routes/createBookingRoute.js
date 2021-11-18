const express = require('express');
const bookingController = require('../controller/bookings.js')
const router = express.Router();

router.get('/createBooking', async (req, resp) => {
        resp.render('createBooking')
})

router.post('/createBooking', async (req, resp) => {
        const {bookingNr, contributionMargin, netPrice, grossPrice, hotelReservations, carRentals, transfers, greenfees, passengers, customerID, salesmanID} = req.body;
        await bookingController.saveBooking(bookingNr, contributionMargin, netPrice, grossPrice, hotelReservations, carRentals, transfers, greenfees, passengers, customerID, salesmanID);
        resp.sendStatus(200);
})
module.exports = router