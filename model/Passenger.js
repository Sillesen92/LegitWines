//Klasse med følgende forbindelser:
//Dobbeltrettet 0..* Flight
const Flight = require('../model/Flight');
class Passenger {
    #firstName
    #lastName
    #gender
    #flights
    #chosenContracts

    constructor(firstName, lastName, gender) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#gender = gender;
        this.#flights = [];
        this.#chosenContracts = [];
    }

    get firstName() {
        return this.#firstName;
    }

    get lastName() {
        return this.#lastName;
    }

    get gender() {
        return this.#gender;
    }

    get flights() {
        return this.#flights;
    }

    get chosenContracts() {
        return this.#chosenContracts;
    }

    set firstName(firstName) {
        this.#firstName = firstName;
    }

    set lastName(lastName) {
        this.#lastName = lastName;
    }

    set gender(gender) {
        this.#gender = gender;
    }

    addFlight(flight) {
        if (flight instanceof Flight) {
            if (!this.#flights.includes(flight)) {
                this.#flights.push(flight);
                flight.addPassenger(this);
            }
        } else {
            throw new Error("passenger er ikke en instans af Passenger")
        }
    }

    removeFlight(flight) {
        if (flight instanceof Flight) {
            if (this.#flights.includes(flight)) {
                let i = this.#flights.indexOf(flight);
                for (let index = i; index < this.#flights.length - 1; index++) {
                    this.#flights[index] = this.#flights[index + 1];
                }
                this.#flights.length = this.#flights.length - 1;
                flight.removePassenger(this);
            }
        } else {
            throw new Error("passenger er ikke en instans af Passenger")
        }
    }

    //Tilføjer en kontrakt til arrayet af valgte kontrakter,
    //hvis ikke kontrakten allerede findes i arrayet.
    addContractToChosenContracts(contract) {
        if (contract instanceof Contract) {
            this.#chosenContracts.push(contract);
        } else {
            throw new Error("Kontrakten er ikke en instans af Contract");
        }
    }

    //Fjerner en kontrakt i arrayet af contracts,
    //hvis denne er tilføjet til dette.
    removeContractFromChosenContracts(contract) {
        if (contract instanceof Contract) {
            if (this.#chosenContracts.includes(contract)) {
                let i = this.#chosenContracts.indexOf(contract);
                for (let index = i; index < this.#chosenContracts.length - 1; index++) {
                    this.#chosenContracts[index] = this.#chosenContracts[index + 1];
                }
                this.#chosenContracts.length = this.#chosenContracts.length - 1;
            }
        } else {
            throw new Error("contract er ikke en instans af Contract");
        }
    }

    // Beregner den samlede pris på de valgte flykontrakter. 
    calcNetPrice() {
        if (this.#chosenContracts.length > 0) {
            for (let index = 0; index < this.#chosenContracts.length; index++) {
                price += (this.#chosenContracts[index].netPrice);
            }
        }
        return price;
    }
}

module.exports = Passenger;