const Booking = require('../model/Booking')
const Customer = require('../model/Customer')
const Salesman = require('../model/Salesman')
const BookingController = require('../controller/bookings')
const Company = require('../model/Company')
const testCustomer = null;
const testSalesman = null;
const testBooking = null;
const testHotel = null;
const testAirline = null;

describe('Unit test af Booking klasse', () => {
    beforeAll(() => {
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

        //preparation of companies
        //hotel
        const hotName = "hotel"
        const HotAdress = "test 123"
        const hotEmail = "test@test.dk"
        const hotPhone = 55555555
        const hotBusinessType = "hotel"
        testHotel = new Company(hotName,HotAdress,hotEmail,hotPhone,hotBusinessType)
        //airline
        const airName ="airline"
        const airAdress = "test 123"
        const airEmail = "test@test.dk"
        const airPhone = 55555555
        const airBusinessType = "airline"
        testAirline = new Company(airName,airAdress,airEmail,airPhone,airBusinessType)
        //bus
        const busName ="bus"
        const busAdress = "test 123"
        const busEmail = "test@test.dk"
        const busPhone = 55555555
        const busBusinessType = "bus"
        testBus = new Company(busName,busAdress,busEmail,busPhone,busBusinessType)

        //billeje
        const bilName ="bil"
        const bilAdress = "test 123"
        const bilEmail = "test@test.dk"
        const bilPhone = 55555555
        const bilBusinessType = "bil"
        testBil = new Company(bilName,bilAdress,bilEmail,bilPhone,bilBusinessType)

        //golf
        const golfName ="golf"
        const golfAdress = "test 123"
        const golfEmail = "test@test.dk"
        const golfPhone = 55555555
        const golfBusinessType = "golf"
        testGolf = new Company(golfName,golfAdress,golfEmail,golfPhone,golfBusinessType)
    })
    
    test('create booking', () => {
        // preparation of booking: 
        const bookingNr = 20210001;
        const contributionMargin = 10;

        // act 
        testBooking = new Booking(bookingNr, contributionMargin, testCustomer, testSalesman)

        // assert
        expect(testBooking.bookingNr).toBe(20210001)
        expect(testBooking.customer.firstName).toBe("John")
        expect(testBooking.salesman.name).toBe("Jonas")
        expect(testBooking).toBeInstanceOf(Booking)
    })

    test('Unit test af udregning af netprice', () => {

        
        
        //todo -lav en af hver 
        
        //act
        const result = testBooking.calcNetPrice();

        // assert
        expect(result).toBe(0)
    })

    test("Hent booking fra repository", async () => {
        //prepare
        const bookingId = 20210002
        const contributionMargin = 10;
        repository.getBookingByBookingId.mockResolvedValue(new Booking(bookingId, contributionMargin, testCustomer, testSalesman))

        // act
        const result = await BookingController.getBookingByBookingId(bookingId)
        // assert
        expect(result.bookingId).toEqual(bookingId)
        expect(result.salesman.name).toBe("Jonas")
        expect(result.customer.email).toEqual('john@gmail.com')
    })
})