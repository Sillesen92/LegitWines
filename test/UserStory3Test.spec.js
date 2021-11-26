const Booking = require('../model/Booking')
const Salesman = require('../model/Salesman')
const Customer = require('../model/Customer')
const repository = require('../repository/repository')
const controller = require('../controller/salesmen')
jest.mock('../repository/repository')
let testSalesman = null;
let testCustomer = null;
let testBooking = null;

describe('Unit test af oprettelse af Salesman', () => {
    beforeEach(() => {
        //preparation of Salesman
        const name = "Jonas"
        const email = "jonas@g2g.dk"
        const tlf = 12121234
        const salesId = "jonassil"
        const password = "ingenDamer"
        testSalesman = new Salesman(name, email, tlf, salesId, password)
        //Preparation of Contract (Hotel) single room

        const firstName = "Bettina"
        const lastName = "Phlüffer"
        const custEmail = "fluffer@xklub.dk"
        const gender = "female"
        const address = "Sønderhøj 30, 8260 Viby J"
        const phone = 69696969
        const dguNr = "101010-1010101"
        testCustomer = new Customer(firstName, lastName, custEmail, gender, address, phone, dguNr)

        //Preparation of Contract (Hotel) double room
        const bookingId = 20210001
        testBooking = new Booking(bookingId, testSalesman, testCustomer)
    })
    test('create Salesman', () => {

        //assert
        expect(testSalesman.name).toBe("Jonas")
        expect(testSalesman.email).toBe("jonas@g2g.dk")
        expect(testSalesman.salesId).toBe("jonassil")
        expect(testSalesman.phoneNr).toEqual(12121234)
        expect(testSalesman).toBeInstanceOf(Salesman)
    })

    test('create Booking tilføjes salesman', () => {
        //assert
        expect(testSalesman.bookinger[0]).toEqual(testBooking)
    })

    test('login salesman', async () => {

        //act
        repository.getSalesman.mockResolvedValue(new Salesman("Jonas", "jonas@g2g.dk", 12121234, "jonassil", "ingenDamer"))

        //assert
        expect((await repository.getSalesman("jonassil")).password).toEqual("ingenDamer")
    })
})