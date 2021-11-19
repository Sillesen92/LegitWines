const repository = require('../repository/repository.js')

async function createCompany(companyName, companyAddress, companyEmail, companyPhone, companyType, contracts) {
    return repository.createCompany(companyName, companyAddress, companyEmail, companyPhone, companyType, contracts)
}

function updateCompany(companyId, companyName, companyAddress, companyEmail, companyPhone, contracts) {
    repository.updateCompany(companyId, companyName, companyAddress, companyEmail, companyPhone, contracts);
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
