const Booking = require('../model/Booking')
const Customer = require('../model/Customer')
const Salesman = require('../model/Salesman')
const BookingController = require('../controller/bookings')
const repository = require('../repository/repository')
const Company = require('../model/Company')
const Contract = require('../model/Contract')
const HotelReservation = require('../model/HotelReservation')
const Flight = require('../model/Flight')
const Boardingpass = require('../model/Boardingpass')
jest.mock('../repository/repository')

// Test customer
let testCustomer = null;
// Test salesman
let testSalesman = null;
// Test booking
let testBooking = null;
// Test hotel company
let testHotelCompany = null;
// Test airline company
let testAirlineCompany = null;
// test hotel company contracts
let testContractSingleRoom = null;
let testContractDoubleRoom = null;
// test hotel reservation
let testHotelReservation = null;
// test Flight reservation
let testFlightReservation = null;
// test airline company contracts
let testAirlineContract1 = null;
let testAirlineContract2 = null;
let testAirlineContract3 = null;
let testAirlineContract4 = null;

// test boardingpasses
let testBoardingpass1 = null;
let testBoardingpass2 = null;
let testBoardingpass3 = null;

// test Transfer company
let testTransferCompany = null;

// test transfer reservations
let testTransferReservation = null;

// test Car rental company
let testCarCompany = null;

// test car reservation
let testCarReservation = null;

// test golf company
let testGolfCompany = null;

// test golf reservation
let testGolfReservation = null;





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
        const hotBusinessType = "1"

        testHotelCompany = new Company(hotName, HotAdress, hotEmail, hotPhone, hotBusinessType)

        //golf
        const golfName = "golf"
        const golfAdress = "test 123"
        const golfEmail = "test@test.dk"
        const golfPhone = 55555555
        const golfBusinessType = "2"
        testGolf = new Company(golfName, golfAdress, golfEmail, golfPhone, golfBusinessType)


        //airline
        const airName = "airline"
        const airAdress = "test 123"
        const airEmail = "test@test.dk"
        const airPhone = 55555555
        const airBusinessType = "3"

        testAirlineCompany = new Company(airName, airAdress, airEmail, airPhone, airBusinessType)

        //bus
        const transferName = "bus"
        const transferAdress = "test 123"
        const transferEmail = "test@test.dk"
        const transferPhone = 55555555
        const transferBusinessType = "bus"

        testTransferCompany = new Company(transferName, transferAdress, transferEmail, transferPhone, transferBusinessType)


        //billeje
        const bilName = "bil"
        const bilAdress = "test 123"
        const bilEmail = "test@test.dk"
        const bilPhone = 55555555
        const bilBusinessType = "5"

        testCarCompany = new Company(bilName, bilAdress, bilEmail, bilPhone, bilBusinessType)


        //golf
        const golfName = "golf"
        const golfAdress = "test 123"
        const golfEmail = "test@test.dk"
        const golfPhone = 55555555
        const golfBusinessType = "golf"
        testGolfCompany = new Company(golfName, golfAdress, golfEmail, golfPhone, golfBusinessType)

        // preparation of booking: 
        const bookingNr = 20210001;
        testBooking = new Booking(bookingNr, testSalesman, testCustomer)

        // preparation of contracts
        //preparation of hotel contracts

        const roomType = "singleRoom";
        const startDate = new Date(2021, 0, 1);
        const endDate = new Date(2021, 11, 31);
        const price = 500;

        testContractSingleRoom = testHotelCompany.createContract(roomType, startDate, endDate, price)

        const roomTypeDouble = "doubleRoom";
        const startDateDouble = new Date(2021, 0, 1);
        const endDateDouble = new Date(2021, 11, 31);
        const priceDouble = 800;

        testContractDoubleRoom = testHotelCompany.createContract(roomTypeDouble, startDateDouble, endDateDouble, priceDouble);

        // preparation of airline contracts
        testAirlineContract1 = testAirlineCompany.createContract("Pris", new Date(2021, 0, 1), new Date(2021, 1, 1), 1500)
        testAirlineContract2 = testAirlineCompany.createContract("Mad", new Date(2021, 0, 1), new Date(2021, 1, 1), 200)
        testAirlineContract3 = testAirlineCompany.createContract("Golftaske", new Date(2021, 0, 1), new Date(2021, 1, 1), 600)
        testAirlineContract4 = testAirlineCompany.createContract("Baggage", new Date(2021, 0, 1), new Date(2021, 1, 1), 200)

        // preparation of Flight Reservation
        const departAirport = "BLL";
        const flightDateTime = new Date(2021, 11, 16, 6, 30)
        const arrivalAirport = "SVQ";
        const flightNr = "JS507"

        testFlightReservation = new Flight(departAirport, flightDateTime, arrivalAirport, flightNr, testAirlineCompany);

        // preparation of boardingpasses
        const firstName1 = "Bolette";
        const lastName1 = "Knudsen";
        const gender1 = "F"
        testBoardingpass1 = testBooking.createBoardingpass(firstName1, lastName1, gender1);

        const firstName2 = "Betina";
        const lastName2 = "Phlüffer";
        const gender2 = "F"
        testBoardingpass2 = testBooking.createBoardingpass(firstName2, lastName2, gender2);

        const firstName3 = "Torben";
        const lastName3 = "Tramper";
        const gender3 = "M"

        testBoardingpass3 = testBooking.createBoardingpass(firstName3, lastName3, gender3)

        testBoardingpass1.addFlight(testFlightReservation);
        testBoardingpass2.addFlight(testFlightReservation);
        testBoardingpass3.addFlight(testFlightReservation);

        // transfer company contracts
        const transferContract1 = testTransferCompany.createContract("Huelva", new Date(2021, 0, 1), new Date(2021, 11, 31), 350)
        const transferContract2 = testTransferCompany.createContract("Cadiz", new Date(2021, 0, 1), new Date(2021, 11, 31), 350)

        // car rental company contract
        const carContract1 = testCarCompany.createContract("Class A", new Date(2021, 0, 1), new Date(2021, 11, 31), 1000)
        const carContract2 = testCarCompany.createContract("Class B", new Date(2021, 0, 1), new Date(2021, 11, 31), 1500)
        const carContract3 = testCarCompany.createContract("Class C", new Date(2021, 0, 1), new Date(2021, 11, 31), 2000)

        // golf company contracts
        // Kontrakter: 
        // 18 huller, 1/1/2021-31/12/2021, 450
        //9 huller, 1 / 1 / 2021 - 31 / 12 / 2021, 300
        const golfContract1 = testGolfCompany.createContract("18 huller", new Date(2021, 0, 1), new Date(2021, 11, 31), 450);
        const golfContract2 = testGolfCompany.createContract("9 huller", new Date(2021, 0, 1), new Date(2021, 11, 31), 300);


        //preparation af booking med forbindelser til contracts
        testHotelReservation = testBooking.createHotelReservation(1, 1, "ingen kommentar", new Date(2021, 10, 16), new Date(2021, 10, 18), "FUCK", testHotelCompany)
        testHotelReservation.addContractToChosenContracts(testContractSingleRoom);
        testHotelReservation.addContractToChosenContracts(testContractDoubleRoom);

        testTransferReservation = testBooking.createTransfer(new Date(2021, 10, 16, 12, 0), "Tilfældig adresse", "X802", testTransferCompany);
        testTransferReservation.addContractToChosenContracts(transferContract1);
        testTransferReservation.addContractToChosenContracts(transferContract2);

        testCarReservation = testBooking.createCarRental(new Date(2021, 10, 16), new Date(2021, 10, 18), "testBookingId", testCarCompany);
        testCarReservation.addContractToChosenContracts(carContract1);
        testCarReservation.addContractToChosenContracts(carContract2);
        testCarReservation.addContractToChosenContracts(carContract3);

        testGolfReservation = testBooking.createGreenfee(new Date(2021, 10, 17, 10, 0), testGolfCompany)
        testGolfReservation.addContractToChosenContracts(golfContract1);
        testGolfReservation.addContractToChosenContracts(golfContract2);

    })

    test('create booking', () => {
        // assert
        expect(testBooking.bookingNr).toBe(20210001)
        expect(testBooking.customer.firstName).toBe("John")
        expect(testBooking.salesman.name).toBe("Jonas")
        expect(testBooking).toBeInstanceOf(Booking)
    })

    test('Unit test til udregning af nettopris på reservation', () => {

        //act
        const result = testHotelReservation.calcNetPrice();
        //assert -> Forventet nettopris 2600kr
        expect(result).toBe(2600);
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
        expect(result.bookingNr).toBe(bookingId)
        expect(result.salesman.name).toBe("Jonas")
        expect(result.customer.email).toBe('john@gmail.com')
    })
})