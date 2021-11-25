//Klasse med følgende forbindelser:
//Dobbeltrettet ..* Boardingpass
const Boardingpass = require('./Boardingpass');
//Dobbeltrettet 1 Company
const Company = require('../model/Company');
class Flight {
    #departAirport
    #dateTime
    #arrivalAirport
    #flightNr
    #boardingpasses
    //company er nullable
    #company

    constructor(departAirport, dateTime, arrivalAirport, flightNr, company) {
        this.#departAirport = departAirport;
        this.#dateTime = dateTime;
        this.#arrivalAirport = arrivalAirport;
        this.#flightNr = flightNr;
        this.#boardingpasses = [];
        this.#company = company;
    }

    get departAirport() {
        return this.#departAirport;
    }

    get date() {
        return this.#dateTime.getFullYear() + " " + this.#dateTime.getMonth() + " " + this.#dateTime.getDate();
    }

    get time() {
        return this.#dateTime.getHours() + " " + this.#dateTime.getMinutes();
    }

    get arrivalAirport() {
        return this.#arrivalAirport;
    }

    get flightNr() {
        return this.#flightNr;
    }

    get boardingpasses() {
        return this.#boardingpasses;
    }

    get company() {
        return this.#company;
    }

    set departAirport(departAirport) {
        this.#departAirport = departAirport;
    }

    set dateTime(dateTime) {
        this.#dateTime = dateTime;
    }

    set arrivalAirport(arrivalAirport) {
        this.#arrivalAirport = arrivalAirport;
    }

    set flightNr(flightNr) {
        this.#flightNr = flightNr;
    }

    //Tilføjer en passager til arrayet af passagerer,
    //hvis ikke denne allerede findes i arrayet.
    addBoardingpass(boardingpass) {
        if (boardingpass instanceof Boardingpass) {
            if (!this.#boardingpasses.includes(boardingpass)) {
                this.#boardingpasses.push(boardingpass);
                boardingpass.setFlight(this);
            }
        } else {
            throw new Error("boardingpass er ikke en instans af Boardingpass")
        }
    }

    //Fjerner en passager i arrayet af passagerer,
    //hvis passageren er tilføjet til dette.
    removeBoardingpass(boardingpass) {
        if (boardingpass instanceof Boardingpass) {
            if (this.#boardingpasses.includes(boardingpass)) {
                boardingpass.setFlight(undefined);
                let i = this.#boardingpasses.indexOf(boardingpass);
                for (let index = i; index < this.#boardingpasses.length - 1; index++) {
                    this.#boardingpasses[index] = this.#boardingpasses[index + 1];
                }
                this.#boardingpasses.length = this.#boardingpasses.length - 1;
                boardingpass.removeFlight(this);
            }
        } else {
            throw new Error("boardingpass er ikke en instans af Boardingpass")
        }
    }

    //Sætter Company til et andet Company, denne må ikke være null!
    setCompany(company) {
        if (company instanceof Company) {
            if (this.#company != company) {
                const oldCompany = this.#company;
                oldCompany.removeFlight(this);
                this.#company = company;
                this.#company.addFlight(this);
            } else {
                throw new Error("Du skal angive en virksomhed, der er forskellig fra den virksomhed du allerede har tilknyttet flyet");
            }
        } else {
            this.#company = undefined;
        }
    }
}

module.exports = Flight;