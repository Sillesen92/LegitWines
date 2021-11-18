//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
const Company = require('../model/Company');
class CarRental {
    #type
    #startDate
    #endDate
    #price
    #bookingId
    //company er nullable
    #company

    constructor(startDate, endDate, bookingId, company) {
        this.#startDate = startDate;
        this.#endDate = endDate;
        this.#price = price;
        this.#bookingId = bookingId;
        this.#company = company;
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
            this.#company = undefined;
        }
    }
}

module.exports = CarRental;