const repository = require('../repository/repository.js')

async function createSalesman(salesmanName, salesmanEmail, salesmanPhoneNr, salesmanSalesId, salesmanPassword) {
    return repository.createSalesman(salesmanName, salesmanEmail, salesmanPhoneNr, salesmanSalesId, salesmanPassword)
}
async function getSalesman(salesmanID) {
    return repository.getSalesman(salesmanID);
}
async function getAllSalesmen() {
    return repository.getAllSalesmen();
}

async function getAllBookingSalesman(salesmanId, dateFrom, dateTo) {
    return repository.getAllBookingSalesman(salesmanId, dateFrom, dateTo);
}

module.exports = { createSalesman, getSalesman, getAllSalesmen, getAllBookingSalesman }
