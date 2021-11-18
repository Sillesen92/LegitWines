//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
const Company = require('../model/Company');
class Transfer {
    #departureTime
    #date
    #destination
    #bookingId
    #company

    constructor(departureTime, date, destination, bookingId, company) {
        this.#departureTime = departureTime;
        this.#date = date;
        this.#destination = destination;
        this.#bookingId = bookingId;
        if (company instanceof Company) {
            this.#company = company;
        } else {
            throw new Error("Company er ikke en instans af Company");
        }
    }

    get departureTime() {
        return this.#departureTime;
    }

    get date() {
        return this.#date;
    }

    get destination() {
        return this.#destination;
    }

    get bookingId() {
        return this.#bookingId;
    }

    get price() {
        return this.#price
    }

    get arrivalTime() {
        return this.#arrivalTime
    }

    get Company() {
        return this.#company;
    }

    get booking() {
        return this.#Booking;
    }

    set departureTime(departureTime) {
        this.#departureTime = departureTime;
    }

    set date(date) {
        this.#date = date;
    }

    set destination(destination) {
        this.#destination = destination;
    }

    set bookingId(bookingId) {
        this.#bookingId = bookingId;
    }

    set price(price) {
        this.#price = price;
    }

    set arrivalTime(arrivalTime) {
        this.#arrivalTime = arrivalTime;
    }

    //Sætter Company til et andet Company, denne må ikke være null!
    setCompany(company) {
        if (company instanceof Company) {
            if (this.#company != company) {
                const oldCompany = this.#company;
                oldCompany.removeTransfer(this);
                this.#company = company;
                this.#company.addTransfer(this);
            } else {
                throw new Error("Du skal angive en virksomhed, der er forskellig fra den virksomhed du allerede har tilknyttet transferen");
            }
        } else {
            throw new Error("company er ikke en instans af Company");
        }
    }
}

module.exports = Transfer;