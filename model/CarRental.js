//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
const Company = require('../model/Company');
const Contract = require('../model/Contract');
class CarRental {
    #startDate
    #endDate
    #bookingId
    #company
    #chosenContracts

    constructor(startDate, endDate, bookingId, company) {
        this.#startDate = startDate;
        this.#endDate = endDate;
        this.#bookingId = bookingId;
        this.#company = company;
        this.#chosenContracts = [];
    }

    get startDate() {
        return this.#startDate;
    }

    get endDate() {
        return this.#endDate;
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

    set startDate(startDate) {
        this.#startDate = startDate;
    }

    set endDate(endDate) {
        this.#endDate = endDate;
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

    // Beregner den samlede pris på de valgte billejekontrakter. 
    calcNetPrice() {
        const timeDifference = this.#endDate.getTime() - this.#startDate.getTime();
        const dayDifference = timeDifference / (1000 * 3600 * 24);
        var price = 0;
        if (this.#chosenContracts.length > 0) {
            for (let index = 0; index < this.#chosenContracts.length; index++) {
                price += (this.#chosenContracts[index].netPrice * dayDifference);
            }
        }
        return price;
    }
}

module.exports = CarRental;