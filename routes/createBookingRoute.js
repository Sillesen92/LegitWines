const express = require('express');
const bookingController = require('../controller/bookings.js')
const companyController = require('../controller/partners')
const router = express.Router();

router.get('/createBooking', async (req, resp) => {
        resp.render('createBooking', { companies: [], loggedIn: true, admin: req.session.admin })
})

router.post('/createBooking', async (req, resp) => {

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

        if (companyType == 'Boardingpass') {
                const flightCompanies = await companyController.getFlightCompanies();
                const flights = [];
                flightCompanies.forEach(doc => {
                        const flight = {
                                companyName: doc.data().companyName,
                                companyId: doc.id,
                                contracts: doc.data().contracts
                        }
                        flights.push(flight)
                });
                resp.status(200).json(flights);
        }

        if (companyType == 'Transfer') {
                const transferCompanies = await companyController.getTransferCompanies();
                const transfers = [];
                transferCompanies.forEach(doc => {
                        const transfer = {
                                companyName: doc.data().companyName,
                                companyId: doc.id,
                                contracts: doc.data().contracts
                        }
                        transfers.push(transfer)
                });
                resp.status(200).json(transfers);
        }

        if (companyType == 'Billeje') {
                const carRentalCompanies = await companyController.getCarRentalCompanies();
                const carRentals = [];
                carRentalCompanies.forEach(doc => {
                        const carRental = {
                                companyName: doc.data().companyName,
                                companyId: doc.id,
                                contracts: doc.data().contracts
                        }
                        carRentals.push(carRental)
                });
                resp.status(200).json(carRentals);
        }

        if (companyType == 'Greenfee') {
                const golfCourseCompanies = await companyController.getGolfCourses();
                const golfCourses = [];
                golfCourseCompanies.forEach(doc => {
                        const golfCourse = {
                                companyName: doc.data().companyName,
                                companyId: doc.id,
                                contracts: doc.data().contracts
                        }
                        golfCourses.push(golfCourse)
                });
                resp.status(200).json(golfCourses);
        }
})
module.exports = router