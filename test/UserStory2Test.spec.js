const Company = require('../model/Company')
const Contract = require('../model/Contract')
const Repository = require('../repository/repository')
const controller = require('../controller/partners')
jest.mock('../repository/repository')
let testHotel = null;
let testContractSingleRoom = null;
let testContractDoubleRoom = null;

describe('Unit test af oprettelse af Company', () => {
    beforeEach(() => {
        //preparation of Company (Hotel)
        const name = "CompanyTest"
        const address = "TestStreet69"
        const email = "test@test.test"
        const phone = 11112222
        const businessType = "Hoteltest"
        testHotel = new Company(name, address, email, phone, businessType)
        //Preparation of Contract (Hotel) single room

        const description = "Test of single room"
        const startDate = new Date(2022, 0, 15)
        const endDate = new Date(2022, 0, 22)
        const netPrice = 2700
        testContractSingleRoom = testHotel.createContract(description, startDate, endDate, netPrice)

        //Preparation of Contract (Hotel) double room
        const description2 = "Test of double room"
        const startDate2 = new Date(2022, 0, 15)
        const endDate2 = new Date(2022, 0, 22)
        const netPrice2 = 4000
        testContractDoubleRoom = testHotel.createContract(description2, startDate2, endDate2, netPrice2)



    })
    test('create Company', () => {

        //assert
        expect(testHotel.name).toBe("CompanyTest")
        expect(testHotel.businessType).toBe("HotelTest")
        expect(testHotel).toBeInstanceOf(Company)
        expect(testHotel.contracts.length).toEqual(2)
    })
    test('create Contract', () => {
        //assert
        expect(testContractSingleRoom.description).toBe("Test af Hotel Contract")
        expect(testContractSingleRoom.startDate).toBe("2022, 0, 15")
        expect(testContractSingleRoom.endDate).toBe("2022, 0, 22")
        expect(testContractSingleRoom.netPrice).toEqual(2700)
        expect(testContractDoubleRoom.netPrice).toEqual(4000)
    })

    test('remove contract', () => {
        //act
        testHotel.removeContract(testContractSingleRoom)
        //assert
        expect(testHotel.contracts.length).toEqual(1)
        expect(testHotel.contracts.includes(testContractSingleRoom)).toBeFalsy()
        expect(testHotel.contracts.includes(testContractDoubleRoom)).toBeTruthy()


    })
    test('get Company from database', () => {
        //prepare
        const name = "CompanyTest"
        const address = "TestStreet69"
        const email = "test@test.test"
        const phone = 11112222
        const businessType = "Hoteltest"
        repository.getCompany.mockResolvedValue(testHotel)

        //act
        const result = await repository.getCompany(10004);

        //assert
        expect(result).toEqual(testHotel);
        expect(result.name).toBe(name);
        expect(result.address).toBe(address);
        expect(result.email).toBe(email);
        expect(result.phone).toBe(phone);
        expect(result.businessType).toBe(businessType);
    })

    //
    test('save Company to database', () => {
        //act

        //assert
    })
    test('test af update partner/company fra firebase', () => {
        const nameToUpdate = "UpdatedName"
        const companyId = 10004
        const addressToUpdate = "TestStreet69Updated"
        const emailToUpdate = "test@test.testUpdated"
        const phoneToUpdate = 21112222
        const businessTypeToUpdate = "HotelTestUpdated"
        Repository.updateCompany.mockResolvedValue(companyId, nameToUpdate, addressToUpdate, emailToUpdate, phoneToUpdate, businessTypeToUpdate)
        const conUpdatedCompany = controller.getCompany(10004);

        expect(conUpdatedCompany.name).toBe(nameToUpdate);
        expect(conUpdatedCompany.address).toBe(addressToUpdate);
        expect(conUpdatedCompany.phone).toBe(phoneToUpdate);
        expect(conUpdatedCompany.email).toBe(emailToUpdate);
        expect(conUpdatedCompany.businessType).toBe(businessTypeToUpdate);
    })
})