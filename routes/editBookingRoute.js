const express = require('express');
const bookingController = require('../controller/bookings.js')
const router = express.Router();
router.get('/editBooking', async (req, resp) => {
        //resp.render('editBooking', {booking: undefined})
        await bookingController.getBooking(req.query.bookingId)
})

router.post('/editBooking', (req, resp) => {
        /*TODO: Metode til håndtering af redigering af booking*/
})
module.exports = router