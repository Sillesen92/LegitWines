//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
const Company = require('../model/Company');
class Transfer {
    #dateTime
    #destination
    #bookingId
    //company er nullable
    #company

    constructor(dateTime, destination, bookingId, company) {
        this.#dateTime = dateTime;
        this.#destination = destination;
        this.#bookingId = bookingId;
        this.#company = company;
    }

    get departureTime() {
        return this.#dateTime.getHours() + ':' + this.#dateTime.getMinutes();
    }

    get date() {
        return this.#dateTime.getFullYear() + " " + this.#dateTime.getMonth() + " " + this.#dateTime.getDate();
    }

    get destination() {
        return this.#destination;
    }

    get bookingId() {
        return this.#bookingId;
    }

    get company() {
        return this.#company;
    }

    set departureTime(departureTime) {
        this.#departureTime = departureTime;
    }

    set date(date) {
        this.#dateTime = date;
    }

    set destination(destination) {
        this.#destination = destination;
    }

    set bookingId(bookingId) {
        this.#bookingId = bookingId;
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
            this.#company = undefined;
        }
    }
}

module.exports = Transfer;