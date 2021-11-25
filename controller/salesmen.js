const repository = require('../repository/repository.js')

async function createSalesman(salesmanName, salesmanEmail, salesmanPhoneNr, salesmanSalesId, salesmanPassword) {
    return repository.createSalesman(salesmanName, salesmanEmail, salesmanPhoneNr, salesmanSalesId, salesmanPassword)
}

module.exports = { createSalesman }
