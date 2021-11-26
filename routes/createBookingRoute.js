const express = require('express');
const bookingController = require('../controller/bookings.js')
const companyController = require('../controller/partners')
const router = express.Router();

router.get('/createBooking', async (req, resp) => {
        resp.render('createBooking', { companies: [] })
})

router.post('/createBooking', async (req, resp) => {
        const { companyType } = req.body
        if ({ companyType } == req.body) {
                const compayType = req.body
                if (companyType == 'hotel') {
                        const hotelDocs = await companyController.getHotels();
                        const hotels = [];
                        hotelDocs.forEach(doc => {
                                const hotel = {
                                        companyName: doc.data().companyName,
                                        companyId: doc.id,
                                        contracts: doc.data().contracts
                                }
                                hotels.push(hotel)

                        });
                        console.log(hotels);
                        resp.status(200).json(hotels);
                }
        }
        // const { bookingNr, contributionMargin, netPrice, grossPrice, hotelReservations, carRentals, transfers, greenfees, passengers, customerID, salesmanID } = req.body;
        // await bookingController.saveBooking(bookingNr, contributionMargin, netPrice, grossPrice, hotelReservations, carRentals, transfers, greenfees, passengers, customerID, salesmanID);
        resp.sendStatus(200);
})

router.post('/getCompanies', async (req, resp) => {
        const { companyType } = req.body
        if (companyType == 'hotel') {
                const hotelDocs = await companyController.getHotels();
                const hotels = [];
                hotelDocs.forEach(doc => {
                        const hotel = {
                                companyName: doc.data().companyName,
                                companyId: doc.id,
                                contracts: doc.data().contracts
                        }
                        hotels.push(hotel)
                });
                resp.status(200).json(hotels);
        }
})
module.exports = router