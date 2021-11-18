const repository = require('../repository/repository.js')

async function createCompany(companyName, companyAddress, companyEmail, companyPhone, companyType) {
    console.log(companyName)
    console.log(companyAddress)
    console.log(companyEmail)
    console.log(companyPhone)
    console.log(companyType)
}

function updateCompany(companyId, companyName, companyAddress, companyEmail, companyPhone) {
    repository.updateCompany(companyId, companyName, companyAddress, companyEmail, companyPhone);
}

function getCompany(id) {
    return repository.getCompany(id)
}

function getHotels() {
    return repository.getHotels()
}

function getFlightCompanies() {
    return repository.getFlightCompanies()
}

function getGolfCourses() {
    return repository.getGolfCourses()
}

function getTransferCompanies() {
    return repository.getTransferCompanies()
}

function getCarRentalCompanies() {
    return repository.getCarRentalCompanies()
}
function getAllCompanies() {
    return repository.getAllCompanies()
}
module.exports = { createCompany, getCompany, getHotels, getFlightCompanies, getGolfCourses, getTransferCompanies, getCarRentalCompanies, getAllCompanies, updateCompany }
