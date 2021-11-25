//Klasse med følgende forbindelser:
// Dobbeltrettet 1 Company
const Company = require('../model/Company');
const Contract = require('../model/Contract')
class HotelReservation {
    #nrSingleRooms
    #nrDoubleRooms
    #comment
    #checkinDate
    #checkoutDate
    #pension
    //company er nullable ::: Kommentar JF: Company må da ikke være nullable? En hotelreservation skal have et company jf. design diagram
    #company
    #chosenContracts

    constructor(nrSingleRooms, nrDoubleRooms, comment, checkinDate, checkoutDate, pension, company) {
        this.#nrSingleRooms = nrSingleRooms;
        this.#nrDoubleRooms = nrDoubleRooms;
        this.#comment = comment;
        this.#checkinDate = checkinDate;
        this.#checkoutDate = checkoutDate;
        this.#pension = pension;
        this.#company = company;
        this.#chosenContracts = [];
    }

    get nrSingleRooms() {
        return this.#nrSingleRooms;
    }

    get nrDoubleRooms() {
        return this.#nrDoubleRooms;
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

    get pension() {
        return this.#pension;
    }

    get company() {
        return this.#company;
    }

    get chosenContracts() {
        return this.#chosenContracts;
    }

    set nrSingleRooms(nrSingleRooms) {
        this.#nrSingleRooms = nrSingleRooms;
    }

    set nrDoubleRooms(nrDoubleRooms) {
        this.#nrDoubleRooms = nrDoubleRooms;
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

    set pension(pension) {
        this.#pension = pension;
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

    // Henter alle contracts fra company.
    getCompanyContracts() {
        return this.#company.getContracts();
    }


    // Tilføjer en kontrakt fra et Company og tilføjer det til reservationens egen liste over valgte kontrakter. 
    addContractToChosenContracts(contract) {
        if (contract instanceof Contract) {
            this.#chosenContracts.push(contract);
        }
    }


    // Beregner den samlede pris på de valgte hotelkontrakter. 
    calcNetPrice() {
        const timeDifference = this.#checkoutDate.getTime() - this.#checkinDate.getTime();
        const dayDifference = timeDifference / (1000 * 3600 * 24);
        console.log("Reservation duration: " + dayDifference);
        var price = 0;
        console.log(this.#chosenContracts)
        if (this.#chosenContracts.length > 0) {
            for (let index = 0; index < this.#chosenContracts.length; index++) {
                console.log("Contract " + index)
                price += (this.#chosenContracts[index].netPrice * dayDifference);
            }
        }
        return price;
    }
}

module.exports = HotelReservation;