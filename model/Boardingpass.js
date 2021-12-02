//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
const Company = require('./Company');
const Contract = require('./Contract')
class Boardingpass {
    #firstName
    #lastName
    #gender
    #company
    #chosenContracts

    constructor(firstName, lastName, gender, company) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#gender = gender;
        this.#company = company;
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

    get company() {
        return this.#company;
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

    setCompany(company) {
        if (company instanceof Company) {
            if (this.#company != company) {
                const oldCompany = this.#company;
                oldCompany.removeHotelReservation(this);
                this.#company = company;
                this.#company.addHotelReservation(this);
            } else {
                throw new Error("Du skal angive en virksomhed, der er forskellig fra den virksomhed du allerede har tilknyttet hotelreservationen");
            }
        } else {
            this.#company = undefined;
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