const repository = require('../repository/repository.js')

function getBookings(){
    return repository.getBookings()
}

function getBooking(id){
    return repository.getBooking(id);
}

function createBooking(parameters){
    return repository.createBooking(parameters)
}

module.exports = {getBooking, createBooking, getBookings}

