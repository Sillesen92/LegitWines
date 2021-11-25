const Company = require('../model/Company')
const Contract = require('../model/Contract')
const repository = require('../repository/repository')
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
        const businessType = "HotelTest"
        testHotel = new Company(name, address, email, phone, businessType)
        //Preparation of Contract (Hotel) single room

        const description = "Test of single room"
        const startDate = new Date(2022, 2, 15)
        const endDate = new Date(2022, 2, 22)
        const netPrice = 2700
        testContractSingleRoom = testHotel.createContract(description, startDate, endDate, netPrice)

        //Preparation of Contract (Hotel) double room
        const description2 = "Test of double room"
        const startDate2 = new Date(2022, 2, 15)
        const endDate2 = new Date(2022, 2, 22)
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
        expect(testContractSingleRoom.description).toBe("Test of single room")
        expect(testContractSingleRoom.startDate).toBeInstanceOf(Date)
        expect(testContractSingleRoom.endDate).toBeInstanceOf(Date)
        expect(testContractSingleRoom.startDate.getFullYear()).toEqual(2022)
        expect(testContractSingleRoom.endDate.getFullYear()).toEqual(2022)
        expect(testContractSingleRoom.startDate.getMonth()).toEqual(2)
        expect(testContractSingleRoom.endDate.getMonth()).toEqual(2)
        expect(testContractSingleRoom.startDate.getDate()).toEqual(15)
        expect(testContractSingleRoom.endDate.getDate()).toEqual(22)
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
    test('get Company from database', async () => {
        //prepare
        const name = "CompanyTest"
        const address = "TestStreet69"
        const email = "test@test.test"
        const phone = 11112222
        const businessType = "Hoteltest"
        repository.getCompany.mockResolvedValue(new Company(name, address, email, phone, businessType))

        //act
        const result = await controller.getCompany(10001);

        //assert
        expect(result).toEqual(testHotel);
        expect(result.name).toBe(name);
        expect(result.address).toBe(address);
        expect(result.email).toBe(email);
        expect(result.phone).toBe(phone);
        expect(result.businessType).toBe(businessType);
    })

    // test('test af update partner/company fra firebase', async () => {
    //     const name = "CompanyTest"
    //     const address = "TestStreet69"
    //     const email = "test@test.test"
    //     const phone = 11112222
    //     const businessType = "Hoteltest"
    //     const nameToUpdate = "UpdatedName"
    //     const companyId = 10001
    //     const addressToUpdate = "TestStreet69Updated"
    //     const emailToUpdate = "test@test.testUpdated"
    //     const phoneToUpdate = 21112222
    //     const businessTypeToUpdate = "HotelTestUpdated"
    //     repository.getCompany.mockResolvedValue(new Company(name, address, email, phone, businessType))
    //     const oldCompany = await repository.getCompany(10001);
    //     const conUpdatedCompany = await repository.updateCompany(10001, nameToUpdate, addressToUpdate, emailToUpdate, phoneToUpdate, businessTypeToUpdate, [])

    //     expect(conUpdatedCompany.name).toBe(nameToUpdate);
    //     expect(conUpdatedCompany.address).toBe(addressToUpdate);
    //     expect(conUpdatedCompany.phone).toBe(phoneToUpdate);
    //     expect(conUpdatedCompany.email).toBe(emailToUpdate);
    //     expect(conUpdatedCompany.businessType).toBe(businessTypeToUpdate);
    // })
})