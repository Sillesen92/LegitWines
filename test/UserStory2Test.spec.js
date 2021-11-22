const Company = require('../model/Company')
const Contract = require('../model/Contract')
const Repository = require('../repository/repository')
const controller = require('../controller/partners')
jest.mock('../repository/repository')
let testCompany = null;
let testContract = null;
let testContract2 = null;

describe('Unit test af oprettelse af Company', () => {
    beforeEach(() => {
        //preparation of Company
        const name = "CompanyTest"
        const address = "TestStreet69"
        const email = "test@test.test"
        const phone = 11112222
        const businessType = "HotelTest"
        testCompany = new Company(name, address, email, phone, businessType)
        //Preparation of Contract

        const description = "Test of Hotel Contract"
        const startDate = new Date(2022, 0, 15)
        const endDate = new Date(2022, 0, 22)
        const netPrice = 4000
        testContract = testCompany.createContract(description, startDate, endDate, netPrice)

        //Preparation of Contract#2
        const description2 = "Test Two of Hotel Contract"
        const startDate2 = new Date(2022, 0, 15)
        const endDate2 = new Date(2022, 0, 22)
        const netPrice2 = 2700
        testContract2 = testCompany.createContract(description2, startDate2, endDate2, netPrice2)



    })
    test('create Company', () => {

        //assert
        expect(testCompany.name).toBe("CompanyTest")
        expect(testCompany.businessType).toBe("HotelTest")
        expect(testCompany).toBeInstanceOf(Company)
        expect(testCompany.contracts.length).toEqual(2)
    })
    test('create Contract', () => {
        //assert
        expect(testContract.description).toBe("Test af Hotel Contract")
        expect(testContract.startDate).toBe("2022, 0, 15")
        expect(testContract.endDate).toBe("2022, 0, 22")
        expect(testContract.netPrice).toEqual(4000)
        expect(testContract2.netPrice).toEqual(2700)
    })

    test('remove contract', () => {
        //act
        testCompany.removeContract(testContract)
        //assert
        expect(testCompany.contracts.length).toEqual(1)
        expect(testCompany.contracts.includes(testContract)).toBeFalsy()
        expect(testCompany.contracts.includes(testContract2)).toBeTruthy()

    })
    test('get Company from database', () => {
        //act

        //assert
    })
    //
    test('save Company to database', () => {
        //act

        //assert
    })
    test('test af getCompany fra firebase', () => {

        Repository.createCompany.mockResolvedValue(testCompany)
        const res = controller.getCompany(testCompany.id)
        expect(res).toBe(testCompany)
        expect(res.address).toBe("TestStreet69")
        expect(res.name).toBe("CompanyTest")

    })
    test('test af update partner/company fra firebase', () => {
        const nameToUpdate = "UpdatedName"
        const companyId = 1
        const addressToUpdate = "TestStreet69Updated"
        const emailToUpdate = "test@test.testUpdated"
        const phoneToUpdate = 21112222
        const businessTypeToUpdate = "HotelTestUpdated"
        const updatedCom = Repository.updateCompany.mockResolvedValue(companyId, nameToUpdate, addressToUpdate, emailToUpdate, phoneToUpdate, businessTypeToUpdate)
        const conUpdatedCompany = controller.getCompany(1)

        expect(conUpdatedCompany.name).toBe("UpdatedName")
        expect(conUpdatedCompany.phoneToUpdate).toBe(21112222)

    })
})