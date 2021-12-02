//Klasse med følgende forbindelser:
// Dobbeltrettet 1 Company
const Company = require('../model/Company');
const Contract = require('../model/Contract')
class HotelReservation {
    #comment
    #checkinDate
    #checkoutDate
    //company er nullable ::: Kommentar JF: Company må da ikke være nullable? En hotelreservation skal have et company jf. design diagram
    #company
    #chosenContracts

    constructor(comment, checkinDate, checkoutDate, company) {
        this.#comment = comment;
        this.#checkinDate = checkinDate;
        this.#checkoutDate = checkoutDate;
        this.#company = company;
        this.#chosenContracts = [];
    }

    get comment() {
        return this.#comment;
    }

    get checkInDate() {
        return this.#checkinDate;
    }

    get checkoutDate() {
        return this.#checkoutDate;
    }

    get company() {
        return this.#company;
    }

    get chosenContracts() {
        return this.#chosenContracts;
    }

    set comment(comment) {
        this.#comment = comment;
    }

    set checkinDate(checkinDate) {
        this.#checkinDate = checkinDate;
    }

    set checkoutDate(checkoutDate) {
        this.#checkoutDate = checkoutDate;
    }

    //Sætter Company til et andet Company, denne må ikke være null!
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


    // Tilføjer en kontrakt fra et Company og tilføjer det til reservationens egen liste over valgte kontrakter. 
    addContractToChosenContracts(contract) {
        if (contract instanceof Contract) {
            this.#chosenContracts.push(contract);
        }
    }

    removeContractFromChosenContracts(contract) {
        if (contract instanceof Contract) {
            if (this.#chosenContracts.includes(contract)) {
                let i = this.#chosenContracts.indexOf(contract);
                this.#chosenContracts.splice(i, 1);
            }
        } else {
            throw new Error("contract er ikke en instans af klassen Contract");
        }
    }


    // Beregner den samlede pris på de valgte hotelkontrakter. 
    calcNetPrice() {
        const timeDifference = this.#checkoutDate.getTime() - this.#checkinDate.getTime();
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

module.exports = HotelReservation;