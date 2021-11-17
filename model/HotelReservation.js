//Klasse med følgende forbindelser:
// Dobbeltrettet 1 Company
class HotelReservation{
    #nrSingleRooms
    #nrDoubleRooms
    #comment
    #checkinDate
    #checkoutDate
    #pension
    #Company

    constructor(nrSingleRooms, nrDoubleRooms, comment, checkinDate, checkoutDate, pension, Company) {
        this.#nrSingleRooms = nrSingleRooms;
        this.#nrDoubleRooms = nrDoubleRooms;
        this.#comment = comment;
        this.#checkinDate = checkinDate;
        this.#checkoutDate = checkoutDate;
        this.#pension = pension;
        this.#Company = Company;
    }

    get nrSingleRooms(){
        return this.#nrSingleRooms;
    }

    get nrDoubleRooms(){
        return this.#nrDoubleRooms;
    }

    get comment(){
        return this.#comment;
    }

    get checkInDate(){
        return this.#checkinDate;
    }

    get checkoutDate(){
        return this.#checkoutDate;
    }

    get pension(){
        return this.#pension;
    }

    get company(){
        return this.#Company;
    }

    set nrSingleRooms(nrSingleRooms){
        this.#nrSingleRooms = nrSingleRooms;
    }

    set nrDoubleRooms(nrDoubleRooms){
        this.#nrDoubleRooms = nrDoubleRooms;
    }

    set comment(comment){
        this.#comment = comment;
    }

    set checkinDate(checkinDate){
        this.#checkinDate = checkinDate;
    }

    set checkoutDate(checkoutDate){
        this.#checkoutDate = checkoutDate;
    }

    set pension(pension){
        this.#pension = pension;
    }
}

module.exports = HotelReservation;