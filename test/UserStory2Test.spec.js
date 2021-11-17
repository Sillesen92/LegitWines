const Company = require('../model/Company')
const Contract = require('../model/Contract')

describe('Unit test af oprettelse af Company', () =>{
    beforeAll(()=>{
        //preparation of Company
        const name = "CompanyTest"
        const address = "TestStreet69"
        const email = "test@test.test"
        const phone = 11112222
        const businessType = "HotelTest"
        testCompany = new Company(name, address, email, phone, businessType)
        //Preparation of Contract

        const description = "Test of Hotel Contract"
        const startDate = new Date(2022,0,15 )
        const endDate = new Date(2022, 0, 22)
        const netPrice = 4000
        testContract = testCompany.createContract(description, startDate, endDate, netPrice)




    })
    test('create Company', ()=>{
        expect(testCompany.name).toBe("CompanyTest")
        expect(testCompany.businessType).toBe("HotelTest")
        expect(testCompany).toBeInstanceOf(Company)
        expect(testCompany.contracts().length).toEqual(1)
    })
    test('create Contract', ()=>{
        
        expect(testContract.description).toBe("Test af Hotel Contract")
        expect(testContract.startDate).toBe("2022, 0, 15")
        expect(testContract.endDate).toBe("2022, 0, 22")
        expect(testContract.netPrice).toEqual(4000)
    })
})