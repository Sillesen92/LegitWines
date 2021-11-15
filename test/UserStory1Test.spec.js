const Booking = require('../model/Booking')
const Customer = require('../model/Customer')
const Salesman = require('../model/Salesman')
const BookingController = require('../controller/bookings')
const Company = require('../model/Company')
const newCustomer = null;
const newSalesman = null;
const newBooking = null;

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
        newCustomer = new Customer(firstName, lastName, email, gender, adress, phoneNr, dguNr)

        // preparation of salesman:
        const name = "Jonas";
        const salesEmail = "jonas@gmail.com";
        const salesPhoneNr = 98765432
        const salesId = "FunkMasterJones"
        newSalesman = new Salesman(name, salesEmail, salesPhoneNr, salesId)
    })
    
    test('create booking', () => {
        // preparation of booking: 
        const bookingNr = 20210001;
        const contributionMargin = 10;

        // act 
        newBooking = new Booking(bookingNr, contributionMargin, newCustomer, newSalesman)

        // assert
        expect(newBooking.bookingNr).toBe(20210001)
        expect(newBooking.customer.firstName).toBe("John")
        expect(newBooking.salesman.name).toBe("Jonas")
        expect(newBooking).toBeInstanceOf(Booking)
    })

    test('Unit test af udregning af bruttoprisen', () => {

        //preparation of companies
        //hotel
        const hotName = "hotel"
        const HotAdress = "test 123"
        const hotEmail = "test@test.dk"
        const hotPhone = 55555555
        const hotBusinessType = "hotel"
        const newHotel = new Company(hotName,HotAdress,hotEmail,hotPhone,hotBusinessType)
        //airline
        const airName ="airline"
        const airAdress = "test 123"
        const airEmail = "test@test.dk"
        const airPhone = 55555555
        const airBusinessType = "airline"
        const newAirline = new Company(airName,airAdress,airEmail,airPhone,airBusinessType)
        //bus
        const busName ="bus"
        const busAdress = "test 123"
        const busEmail = "test@test.dk"
        const busPhone = 55555555
        const busBusinessType = "bus"
        const newBus = new Company(busName,busAdress,busEmail,busPhone,busBusinessType)

        //billeje
        const bilName ="bil"
        const bilAdress = "test 123"
        const bilEmail = "test@test.dk"
        const bilPhone = 55555555
        const bilBusinessType = "bil"
        const newBil = new Company(bilName,bilAdress,bilEmail,bilPhone,bilBusinessType)

        //golf
        const golfName ="golf"
        const golfAdress = "test 123"
        const golfEmail = "test@test.dk"
        const golfPhone = 55555555
        const golfBusinessType = "golf"
        const newgolf = new Company(golfName,golfAdress,golfEmail,golfPhone,golfBusinessType)
        
        //todo -lav en af hver 
        
        //act
        const result = newBooking.calcGrossPrice();

        // assert
        expect(result).toBe(0)
    })

    test("Hent booking fra repository", async () => {
        //prepare
        const bookingId = 20210002
        const contributionMargin = 10;
        repository.getBookingByBookingId.mockResolvedValue(new Booking(bookingId, contributionMargin, newCustomer, newSalesman))

        // act
        const result = await BookingController.getBookingByBookingId(bookingId)
        // assert
        expect(result.bookingId).toEqual(bookingId)
        expect(result.salesman.name).toBe("Jonas")
        expect(result.customer.email).toEqual('john@gmail.com')
    })
})