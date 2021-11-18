//Klasse med følgende forbindelser:
//Dobbeltrettet ..* Passenger
//Dobbeltrettet 1 Company
class Flight {
    #departAirport
    #date
    #time
    #arrivalAirport
    #flightNr
    #passengers
    #Company

    constructor(departAirport, date, time, arrivalAirport, flightNr, Company) {
        this.#departAirport = departAirport;
        this.#date = date;
        this.#time = time;
        this.#arrivalAirport = arrivalAirport;
        this.#flightNr = flightNr;
        this.#passengers = [];
        this.#Company = Company;
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

    get Company() {
        return this.#Company;
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
        if (!this.#passenger.includes(passenger)) {
            this.#passengers.push(passenger);
        }
    }

    //Fjerner en passager i arrayet af passagerer,
    //hvis passageren er tilføjet til dette.
    removePassenger(passenger) {
        if (this.#passengers.includes(passenger)) {
            let i = this.#passengers.indexOf(passenger);
            for (let index = i; index < this.#passengers.length - 1; index++) {
                this.#passengers[index] = this.#passengers[index + 1];
            }
            this.#passengers.length = this.#passengers.length - 1;
        }
    }

    //Sætter Company til et andet Company, denne må ikke være null!
    setCompany(Company) {
        if (this.#Company != Company && Company != undefined) {
            const oldCompany = this.#Company;
            oldCompany.removeFlight(this);
            this.#Company = Company;
            this.#Company.addFlight(this);
        } else {
            throw new Error("Du skal angive en virksomhed, der er forskellig fra den virksomhed du allerede har tilknyttet flyet");
        }
    }
}

module.exports = Flight;