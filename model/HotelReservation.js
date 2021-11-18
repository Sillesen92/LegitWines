//Klasse med følgende forbindelser:
// Dobbeltrettet 1 Company
// Dobbeltrettet 1 Booking
class HotelReservation {
    #nrSingleRooms
    #nrDoubleRooms
    #comment
    #checkinDate
    #checkoutDate
    #pension
    #Company
    #Booking

    constructor(nrSingleRooms, nrDoubleRooms, comment, checkinDate, checkoutDate, pension, Company, Booking) {
        this.#nrSingleRooms = nrSingleRooms;
        this.#nrDoubleRooms = nrDoubleRooms;
        this.#comment = comment;
        this.#checkinDate = checkinDate;
        this.#checkoutDate = checkoutDate;
        this.#pension = pension;
        this.#Company = Company;
        this.#Booking = Booking;
    }

    get nrSingleRooms() {
        return this.#nrSingleRooms;
    }

    get nrDoubleRooms() {
        return this.#nrDoubleRooms;
    }

    get comment() {
        return this.#comment;
    }

    get checkInDate() {
        return this.#checkinDate;
    }

    get checkoutDate() {
        return this.#checkoutDate;
    }

    get pension() {
        return this.#pension;
    }

    get company() {
        return this.#Company;
    }

    get booking() {
        return this.#Booking;
    }

    set nrSingleRooms(nrSingleRooms) {
        this.#nrSingleRooms = nrSingleRooms;
    }

    set nrDoubleRooms(nrDoubleRooms) {
        this.#nrDoubleRooms = nrDoubleRooms;
    }

    set comment(comment) {
        this.#comment = comment;
    }

    set checkinDate(checkinDate) {
        this.#checkinDate = checkinDate;
    }

    set checkoutDate(checkoutDate) {
        this.#checkoutDate = checkoutDate;
    }

    set pension(pension) {
        this.#pension = pension;
    }

    //Sætter Company til et andet Company, denne må ikke være null!
    setCompany(Company) {
        if (this.#Company != Company && Company != undefined) {
            const oldCompany = this.#Company;
            oldCompany.removeHotelReservation(this);
            this.#Company = Company;
            this.#Company.addHotelReservation(this);
        } else {
            throw new Error("Du skal angive en virksomhed, der er forskellig fra den virksomhed du allerede har tilknyttet hotelreservationen");
        }
    }

    //Sætter Booking til en anden Booking, denne må ikke være null!
    setBooking(Booking) {
        if (this.#Booking != Booking && Booking != undefined) {
            const oldBooking = this.#Booking;
            oldBooking.removeHotelReservation(this);
            this.#Booking = Booking;
            this.#Booking.addHotelReservation(this);
        } else {
            throw new Error("Du skal angive en booking, der er forskellig fra den booking du allerede har tilknyttet hotelreservationen");
        }
    }
}

module.exports = HotelReservation;