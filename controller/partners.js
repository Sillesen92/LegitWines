const repository = require('../repository/repository.js')

async function createCompany(companyName, companyAddress, companyEmail, companyPhone, companyType) {
    console.log(companyName)
    console.log(companyAddress)
    console.log(companyEmail)
    console.log(companyPhone)
    console.log(companyType)
}

module.exports = {createCompany}
