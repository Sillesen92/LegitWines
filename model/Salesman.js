//Klasse med følgende forbindelser:
//Dobbeltrettet 0..* Booking
const Booking = require('../model/Booking');
class Salesman {
    #name
    #email
    #phoneNr
    #salesId
    #password
    #bookings

    constructor(name, email, phoneNr, salesId, password) {
        this.#name = name;
        this.#email = email;
        this.#phoneNr = phoneNr;
        this.#salesId = salesId;
        this.#password = password;
        this.#bookings = [];
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

    get bookings() {
        return this.#bookings;
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
            if (!this.#bookings.includes(booking)) {
                this.#bookings.push(booking);
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
            if (this.#bookings.includes(booking)) {
                let i = this.#bookings.indexOf(booking);
                for (let index = i; index < this.#bookings.length - 1; index++) {
                    this.#bookings[index] = this.#bookings[index + 1];
                }
                this.#bookings.length = this.#bookings.length - 1;
            }
        } else {
            throw new Error("booking er ikke en instans af Booking")
        }
    }

    getSalesStatistics() {
        const salesStats = {
            netSales: 0,
            grossSales: 0,
            contributionMargin: 0
        }
        if (this.#bookings.length > 0) {
            if (this.#bookings.length == 1) {
                salesStats.netSales = this.#bookings[0].calcNetPrice();
                salesStats.grossSales = this.#bookings[0].calcGrossPrice();
                salesStats.contributionMargin = this.#bookings[0].calcContributionMarginInDKK();
                return salesStats;
            } else {
                for (let index = i; index < this.#bookings.length; index++) {
                    salesStats.netSales += this.#bookings[i].calcNetPrice();
                    salesStats.grossSales += this.#bookings[i].calcGrossPrice();
                    salesStats.contributionMargin += this.#bookings[i].calcContributionMarginInDKK();
                }
                return salesStats;
            }
        } else {
            throw new Error("Der er ingen bookinger registreret til denne sælger.")
        }
    }

    getSalesStatisticsForPeriod(startDate, endDate) {
        const salesStatsForPeriod = {
            netSales: 0,
            grossSales: 0,
            contributionMargin: 0
        }
        if (this.#bookings.length > 0) {
            if (this.#bookings.length == 1 && this.#bookings[0].date >= startDate && this.#bookings[0].date <= endDate) {
                salesStatsForPeriod.netSales = this.#bookings[0].calcNetPrice();
                salesStatsForPeriod.grossSales = this.#bookings[0].calcGrossPrice();
                salesStatsForPeriod.contributionMargin = this.#bookings[0].calcContributionMarginInDKK();
                return salesStatsForPeriod;
            } else {
                for (let index = i; index < this.#bookings.length; index++) {
                    if (this.#bookings[i].date >= startDate && this.#bookings[i].date <= endDate) {
                        salesStatsForPeriod.netSales += this.#bookings[i].calcNetPrice();
                        salesStatsForPeriod.grossSales += this.#bookings[i].calcGrossPrice();
                        salesStatsForPeriod.contributionMargin += this.#bookings[i].calcContributionMarginInDKK();
                    }
                }
                return salesStatsForPeriod;
            }
        } else {
            throw new Error("Der findes ingen bookingen indenfor den angivet periode.");
        }
    }

}



module.exports = Salesman;