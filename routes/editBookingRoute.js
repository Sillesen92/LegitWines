const express = require('express');
const bookingController = require('../controller/bookings.js')
const router = express.Router();
router.get('/editBooking', async (req, resp) => {
        //resp.render('editBooking', {booking: undefined})
        // await bookingController.getBooking(req.query.bookingId)
        resp.render('../views/updatebooking', { loggedIn: true, admin: req.session.admin })
})

router.post('/editBooking', async (req, resp) => {
        try {
                const { bookingNr } = req.body;
                /*TODO: Metode til håndtering af redigering af booking*/
                const booking = await bookingController.getBooking(bookingNr)
                console.log(new Date().getFullYear())
                console.log(booking.data())
                if (booking) {
                        const bookingToSend = {
                                bookingNr: booking.data().bookingNr,
                                salesman: booking.data().salesman,
                                travelDocuments: booking.data().travelDocuments
                        }
                        resp.status(200).json(bookingToSend)
                } else {
                        console.log("Skete en fejl ved indlæsning af booking")
                }
        } catch (error) {
                console.log(error.message)
        }
})
module.exports = router