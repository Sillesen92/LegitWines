//Klasse med følgende forbindelser:
//Dobbeltrettet 0..* Booking
const Booking = require('../model/Booking');
class Salesman {
    #name
    #email
    #phoneNr
    #salesId
    #password
    #bookinger

    constructor(name, email, phoneNr, salesId, password) {
        this.#name = name;
        this.#email = email;
        this.#phoneNr = phoneNr;
        this.#salesId = salesId;
        this.#password = password;
        this.#bookinger = [];
    }

    get name() {
        return this.#name;
    }

    get email() {
        return this.#email;
    }

    get phoneNr() {
        return this.#phoneNr;
    }

    get salesId() {
        return this.#salesId;
    }

    get password() {
        return this.#password;
    }

    get bookinger() {
        return this.#bookinger;
    }

    set name(name) {
        this.#name = name;
    }

    set email(email) {
        this.#email = email;
    }

    set phoneNr(phoneNr) {
        this.#phoneNr = phoneNr;
    }

    set salesId(salesId) {
        this.#salesId = salesId;
    }

    set password(password) {
        this.#password = password;
    }

    //Tilføjer en booking til arrayet af bookinger,
    //hvis ikke denne allerede findes i arrayet.
    addBooking(booking) {
        if (booking instanceof Booking) {
            if (!this.#bookinger.includes(booking)) {
                this.#bookinger.push(booking);
                booking.setSalesman(this);
            }
        } else {
            throw new Error("booking er ikke en instans af Booking")
        }
    }

    //Fjerner en booking fra arrayet af bookinger,
    //hvis denne allerede er i arrayet.
    removeBooking(booking) {
        if (booking instanceof Booking) {
            if (this.#bookinger.includes(booking)) {
                let i = this.#bookinger.indexOf(booking);
                for (let index = i; index < this.#bookinger.length - 1; index++) {
                    this.#bookinger[index] = this.#bookinger[index + 1];
                }
                this.#bookinger.length = this.#bookinger.length - 1;
            }
        } else{
            throw new Error("booking er ikke en instans af Booking")
        }
    }

    getSalesStatistics() {
        const salesStats = {
            netSales: 0,
            grossSales: 0,
            contributionMargin: 0
        }
        if (this.#bookinger.length > 0) {
            if (this.#bookinger.length == 1) {
                salesStats.netSales = this.#bookinger[0].calcNetPrice();
                salesStats.grossSales = this.#bookinger[0].calcGrossPrice();
                salesStats.contributionMargin = this.#bookinger[0].calcContributionMarginInDKK();
                return salesStats;
            } else {
                for (let index = i; index < this.#bookinger.length; index++) {
                    salesStats.netSales += this.#bookinger[i].calcNetPrice();
                    salesStats.grossSales += this.#bookinger[i].calcGrossPrice();
                    salesStats.contributionMargin += this.#bookinger[i].calcContributionMarginInDKK();
                }
                return salesStats;
            }
        } else {
            throw new Error("Der er ingen bookinger registreret til denne sælger.")
        }
    }
}

module.exports = Salesman;