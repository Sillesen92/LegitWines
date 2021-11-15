const repository = require('../repository/repository.js')

function getBookings(){
    return repository.getBookings()
}

function getBooking(id){
    return repository.getBooking(id);
}

function saveBooking(parameters){
    return repository.saveBooking(parameters)
}

module.exports = {getBooking, saveBooking, getBookings}

