//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
const Company = require('../model/Company');
class CarRental {
    #type
    #startDate
    #endDate
    #price
    #bookingId
    #company

    constructor(startDate, endDate, bookingId, company) {
        this.#startDate = startDate;
        this.#endDate = endDate;
        this.#price = price;
        this.#bookingId = bookingId;
        if (company instanceof Company) {
            this.#company = company;
        } else {
            throw new Error("Company er ikke en instans af Company");
        }
    }

    get type() {
        return this.#type;
    }

    get startDate() {
        return this.#startDate;
    }

    get endDate() {
        return this.#endDate;
    }

    get price() {
        return this.#price;
    }

    get bookingId() {
        return this.#bookingId;
    }

    get company() {
        return this.#company;
    }

    set type(type) {
        this.#type = type;
    }

    set startDate(startDate) {
        this.#startDate = startDate;
    }

    set endDate(endDate) {
        this.#endDate = endDate;
    }

    set price(price) {
        this.#price = price;
    }

    set bookingId(bookingId) {
        this.#bookingId = bookingId;
    }
    //Sætter Company til et andet Company, denne må ikke være null!
    setCompany(company) {
        if (company instanceof Company) {
            if (this.#company != company) {
                const oldCompany = this.#company;
                oldCompany.removeCarRental(this);
                this.#company = Company;
                this.#company.addCarRental(this);
            } else {
                throw new Error("Du skal angive en virksomhed, der er forskellig fra den virksomhed du allerede har tilknyttet billejen");
            }
        } else {
            throw new Error("company er ikke en instans af Company");
        }
    }
}

module.exports = CarRental;