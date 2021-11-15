const Booking = require('../model/Booking')
const Customer = require('../model/Customer')
const Salesman = require('../model/Salesman')
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

        //act
        const result = newBooking.calcGrossPrice();

        // assert
        expect(result).toBe(0)
    })
})