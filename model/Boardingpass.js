//Klasse med følgende forbindelser:
//Dobbeltrettet 0..* Flight
const Flight = require('./Flight');
const Contract = require('./Contract')
class Boardingpass {
    #firstName
    #lastName
    #gender
    #flight
    #chosenContracts

    constructor(firstName, lastName, gender, flight) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#gender = gender;
        this.#flight = flight;
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

    get flight() {
        return this.#flight;
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

    setFlight(flight) {
        if (flight instanceof Flight) {
            if (this.#flight != flight) {
                const oldFlight = this.#flight;
                oldFlight.removeFlight(this);
                this.#flight = flight;
                this.#flight.addBoardingpass(this);
            } else {
                throw new Error("Du skal angive en flyafgang, der er forskellig fra den flyafgang du allerede har tilknyttet");
            }
        } else {
            throw new Error("Du skal medgive et object af typen Flight")
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
        var price = 0;
        if (this.#chosenContracts.length > 0) {
            for (let index = 0; index < this.#chosenContracts.length; index++) {
                price += (this.#chosenContracts[index].netPrice);
            }
        }
        return price;
    }
}

module.exports = Boardingpass;