//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
const Company = require('../model/Company');
class Greenfee {
    #date
    #teetime
    #nrOfGolfers
    //company er nullable
    #company


    constructor(date, teetime, nrOfGolfers, company) {
        this.#date = date;
        this.#teetime = teetime;
        this.#nrOfGolfers = nrOfGolfers;
        this.#company = company;
    }

    get date() {
        return this.#date;
    }

    get teetime() {
        return this.#teetime;
    }

    get nrOfGolfers() {
        return this.#nrOfGolfers;
    }

    get Company() {
        return this.#company;
    }

    get booking() {
        return this.#Booking;
    }

    set date(date) {
        this.#date = date;
    }

    set teetime(teetime) {
        this.#teetime = teetime;
    }

    set nrOfGolfers(nrOfGolfers) {
        this.#nrOfGolfers = nrOfGolfers;
    }
    //Sætter Company til et andet Company, denne må ikke være null!
    setCompany(company) {
        if (company instanceof Company) {
            if (this.#company != company) {
                const oldCompany = this.#company;
                oldCompany.removeGreenfee(this);
                this.#company = company;
                this.#company.addGreenfee(this);
            } else {
                throw new Error("Du skal angive en virksomhed, der er forskellig fra den virksomhed du allerede har tilknyttet greenfee'en");
            }
        } else {
            this.#company = undefined;
        }
    }
}

module.exports = Greenfee;