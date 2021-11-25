//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
const Company = require('../model/Company');
class Greenfee {
    #dateTime
    #nrOfGolfers
    //company er nullable
    #company


    constructor(dateTime, company) {
        this.#dateTime = dateTime;
        this.#company = company;
    }

    get date() {
        return this.#dateTime.getFullYear() + " " + this.#dateTime.getMonth() + " " + this.#dateTime.getDate();
    }

    get teetime() {
        return this.#dateTime.getHours() + " " + this.#dateTime.getMinutes();
    }

    get nrOfGolfers() {
        return this.#nrOfGolfers;
    }

    get company() {
        return this.#company;
    }

    set date(date) {
        this.#dateTime = date;
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