//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
const Company = require('../model/Company');
class Transfer {
    #departureTime
    #date
    #destination
    #bookingId
    #company
    #chosenContracts

    constructor(departureTime, date, destination, bookingId, company) {
        this.#departureTime = departureTime;
        this.#date = date;
        this.#destination = destination;
        this.#bookingId = bookingId;
        this.#company = company;
        this.#chosenContracts = [];
    }

    get departureTime() {
        return this.#departureTime;
    }

    get date() {
        return this.#date;
    }

    get destination() {
        return this.#destination;
    }

    get bookingId() {
        return this.#bookingId;
    }

    get company() {
        return this.#company;
    }

    get chosenContracts() {
        return this.#chosenContracts;
    }

    set departureTime(departureTime) {
        this.#departureTime = departureTime;
    }

    set date(date) {
        this.#date = date;
    }

    set destination(destination) {
        this.#destination = destination;
    }

    set bookingId(bookingId) {
        this.#bookingId = bookingId;
    }

    //Sætter Company til et andet Company, denne må ikke være null!
    setCompany(company) {
        if (company instanceof Company) {
            if (this.#company != company) {
                const oldCompany = this.#company;
                oldCompany.removeTransfer(this);
                this.#company = company;
                this.#company.addTransfer(this);
            } else {
                throw new Error("Du skal angive en virksomhed, der er forskellig fra den virksomhed du allerede har tilknyttet transferen");
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

    // Beregner den samlede pris på de valgte transferkontrakter. 
    calcNetPrice() {
        if (this.#chosenContracts.length > 0) {
            for (let index = 0; index < this.#chosenContracts.length; index++) {
                price += (this.#chosenContracts[index].netPrice);
            }
        }
        return price;
    }
}

module.exports = Transfer;