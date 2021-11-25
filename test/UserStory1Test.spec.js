const Booking = require('../model/Booking')
const Customer = require('../model/Customer')
const Salesman = require('../model/Salesman')
const BookingController = require('../controller/bookings')
const repository = require('../repository/repository')
const Company = require('../model/Company')
const Contract = require('../model/Contract')
const HotelReservation = require('../model/HotelReservation')
jest.mock('../repository/repository')

let testCustomer = null;
let testSalesman = null;
let testBooking = null;
let testHotel = null;
let testAirline = null;
let testContractRoom = null;
let testContractDoubleRoom = null;
let testHotelReservation = null;

describe('Unit test af Booking klasse', () => {
    beforeEach(() => {
        // preparation of customer:
        const firstName = 'John';
        const lastName = 'Doe';
        const gender = 'Male';
        const email = 'john@gmail.com';
        const adress = 'John Doe Vej, 8000, Aarhus C'
        const phoneNr = 12345678
        const dguNr = "1010101-0101010"
        testCustomer = new Customer(firstName, lastName, email, gender, adress, phoneNr, dguNr)

        // preparation of salesman:
        const name = "Jonas";
        const salesEmail = "jonas@gmail.com";
        const salesPhoneNr = 98765432
        const salesId = "FunkMasterJones"

        testSalesman = new Salesman(name, salesEmail, salesPhoneNr, salesId)
        // preparation of companies: 
        //hotel
        const hotName = "hotel"
        const HotAdress = "test 123"
        const hotEmail = "test@test.dk"
        const hotPhone = 55555555
        const hotBusinessType = "hotel"

        testHotel = new Company(hotName, HotAdress, hotEmail, hotPhone, hotBusinessType)

        //airline
        const airName = "airline"
        const airAdress = "test 123"
        const airEmail = "test@test.dk"
        const airPhone = 55555555
        const airBusinessType = "airline"

        testAirline = new Company(airName, airAdress, airEmail, airPhone, airBusinessType)

        //bus
        const busName = "bus"
        const busAdress = "test 123"
        const busEmail = "test@test.dk"
        const busPhone = 55555555
        const busBusinessType = "bus"

        testBus = new Company(busName, busAdress, busEmail, busPhone, busBusinessType)


        //billeje
        const bilName = "bil"
        const bilAdress = "test 123"
        const bilEmail = "test@test.dk"
        const bilPhone = 55555555
        const bilBusinessType = "bil"

        testBil = new Company(bilName, bilAdress, bilEmail, bilPhone, bilBusinessType)


        //golf
        const golfName = "golf"
        const golfAdress = "test 123"
        const golfEmail = "test@test.dk"
        const golfPhone = 55555555
        const golfBusinessType = "golf"
        testGolf = new Company(golfName, golfAdress, golfEmail, golfPhone, golfBusinessType)

        // preparation of booking: 
        const bookingNr = 20210001;
        testBooking = new Booking(bookingNr, testSalesman, testCustomer)

        // preparation of contracts
        //preparation of hotel contracts

        const roomType = "singleRoom";
        const startDate = new Date(2021, 10, 1);
        const endDate = new Date(2021, 11, 1);
        const price = 500;

        testContractRoom = testHotel.createContract(roomType, startDate, endDate, price)

        const roomTypeDouble = "doubleRoom";
        const startDateDouble = new Date(2021, 10, 1);
        const endDateDouble = new Date(2021, 11, 1);
        const priceDouble = 800;

        testContractDoubleRoom = testHotel.createContract(roomTypeDouble, startDateDouble, endDateDouble, priceDouble);

        //preparation af booking med forbindelser til contracts
        testHotelReservation = testBooking.createHotelReservation(1, 1, "ingen kommentar", new Date(2021, 10, 16), new Date(2021, 10, 18), "FUCK", testHotel)
        testHotelReservation.addContractToChosenContracts(testContractRoom);
        testHotelReservation.addContractToChosenContracts(testContractDoubleRoom);
        //Kommentar tester: Der er ingen addContract metode på HotelReservation.

    })

    test('create booking', () => {
        // assert
        expect(testBooking.bookingNr).toBe(20210001)
        expect(testBooking.customer.firstName).toBe("John")
        expect(testBooking.salesman.name).toBe("Jonas")
        expect(testBooking).toBeInstanceOf(Booking)
    })

    test('Unit test af udregning af nettoprisen', () => {

        //act
        const result = testBooking.calcNetPrice();

        //assert -> forventet nettopris: 2600kr
        expect(result).toBe(2600)

    })

    test('Unit test af udregning af grossprice', () => {
        //act
        const result = testBooking.calcGrossPrice();

        // assert -> forventet bruttopris: 3081kr
        expect(result).toEqual(3081)
    })

    test('Unit test af dækningsbidragsberegning', () => {
        //act
        const result = testBooking.calcContributionMarginInDKK();

        // assert -> forventet fortjeneste: 481kr
        expect(result).toEqual(481)
    })

    test("Hent booking fra repository", async () => {
        //prepare
        const bookingId = 20210002
        repository.getBooking.mockResolvedValue(new Booking(bookingId, testSalesman, testCustomer))

        // act
        const result = await BookingController.getBooking(bookingId)
        // assert
        expect(result.bookingId).toBe(bookingId)
        expect(result.salesman.name).toBe("Jonas")
        expect(result.customer.email).toBe('john@gmail.com')
    })
})