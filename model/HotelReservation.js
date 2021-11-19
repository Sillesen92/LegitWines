//Klasse med følgende forbindelser:
// Dobbeltrettet 1 Company
const Company = require('../model/Company');
class HotelReservation {
    #nrSingleRooms
    #nrDoubleRooms
    #comment
    #checkinDate
    #checkoutDate
    #pension
    //company er nullable
    #company

    constructor(nrSingleRooms, nrDoubleRooms, comment, checkinDate, checkoutDate, pension, company) {
        this.#nrSingleRooms = nrSingleRooms;
        this.#nrDoubleRooms = nrDoubleRooms;
        this.#comment = comment;
        this.#checkinDate = checkinDate;
        this.#checkoutDate = checkoutDate;
        this.#pension = pension;
        this.#company = company;
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
        return this.#company;
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
    setCompany(company) {
        if (company instanceof Company) {
            if (this.#company != company) {
                const oldCompany = this.#company;
                oldCompany.removeHotelReservation(this);
                this.#company = company;
                this.#company.addHotelReservation(this);
            } else {
                throw new Error("Du skal angive en virksomhed, der er forskellig fra den virksomhed du allerede har tilknyttet hotelreservationen");
            }
        } else {
            this.#company = undefined;
        }
    }
}

module.exports = HotelReservation;