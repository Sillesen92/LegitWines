const repository = require('../repository/repository.js')

function getBookings(){
    return repository.getBookings()
}

function saveBooking(parameters){
    return repository.saveBooking(parameters)
}

