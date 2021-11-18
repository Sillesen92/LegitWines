//Klasse med følgende forbindelser:
//Dobbeltrettet ..* Passenger
const Passenger = require('../model/Passenger');
//Dobbeltrettet 1 Company
const Company = require('../model/Company');
class Flight {
    #departAirport
    #date
    #time
    #arrivalAirport
    #flightNr
    #passengers
    #company

    constructor(departAirport, date, time, arrivalAirport, flightNr, company) {
        this.#departAirport = departAirport;
        this.#date = date;
        this.#time = time;
        this.#arrivalAirport = arrivalAirport;
        this.#flightNr = flightNr;
        this.#passengers = [];
        if (company instanceof Company) {
            this.#company = company;
        } else {
            throw new Error("Company er ikke en instans af Company");
        }
    }

    get departAirport() {
        return this.#departAirport;
    }

    get date() {
        return this.#date;
    }

    get time() {
        return this.#time;
    }

    get arrivalAirport() {
        return this.#arrivalAirport;
    }

    get flightNr() {
        return this.#flightNr;
    }

    get passengers() {
        return this.#passengers;
    }

    get company() {
        return this.#company;
    }

    set departAirport(departAirport) {
        this.#departAirport = departAirport;
    }

    set date(date) {
        this.#date = date;
    }

    set time(time) {
        this.#time = time;
    }

    set arrivalAirport(arrivalAirport) {
        this.#arrivalAirport = arrivalAirport;
    }

    set flightNr(flightNr) {
        this.#flightNr = flightNr;
    }

    //Tilføjer en passager til arrayet af passagerer,
    //hvis ikke denne allerede findes i arrayet.
    addPassenger(passenger) {
        if (passenger instanceof Passenger) {
            if (!this.#passenger.includes(passenger)) {
                this.#passengers.push(passenger);
            }
        } else {
            throw new Error("passenger er ikke en instans af Passenger")
        }
    }

    //Fjerner en passager i arrayet af passagerer,
    //hvis passageren er tilføjet til dette.
    removePassenger(passenger) {
        if (passenger instanceof Passenger) {
            if (this.#passengers.includes(passenger)) {
                let i = this.#passengers.indexOf(passenger);
                for (let index = i; index < this.#passengers.length - 1; index++) {
                    this.#passengers[index] = this.#passengers[index + 1];
                }
                this.#passengers.length = this.#passengers.length - 1;
            }
        } else {
            throw new Error("passenger er ikke en instans af Passenger")
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
            throw new Error("company er ikke en instans af Company");
        }
    }
}

module.exports = Flight;