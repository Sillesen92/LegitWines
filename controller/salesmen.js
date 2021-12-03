const repository = require('../repository/repository.js')

async function createSalesman(salesmanName, salesmanEmail, salesmanPhoneNr, salesmanSalesId, salesmanPassword) {
    return repository.createSalesman(salesmanName, salesmanEmail, salesmanPhoneNr, salesmanSalesId, salesmanPassword)
}
async function getSalesman(salesmanID) {
    return repository.getSalesman(salesmanID);
}

async function loginSalesman(username, password) {
    return repository.loginSalesman(username, password);
}

async function getAllSalesmen() {
    return repository.getAllSalesmen();
}

module.exports = { createSalesman, getSalesman, getAllSalesmen, loginSalesman }
