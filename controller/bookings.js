const repository = require('../repository/repository.js')

function getBookings() {
    return repository.getBookings()
}

function getBooking(id) {
    return repository.getBooking(id);
}

function createBooking(parameters) {
    return repository.createBooking(parameters)
}

function getBookingForYear(year) {
    return repository.getBookingForYear(year)
}

function getAllBookingSalesman(salesmanId, dateFrom, dateTo) {
    return repository.getBookingsBySalesman(salesmanId, dateFrom, dateTo)
}

module.exports = { getBookingForYear, getBooking, createBooking, getBookings, getAllBookingSalesman }

