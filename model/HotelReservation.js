//Klasse med følgende forbindelser:
// Dobbeltrettet 1 Company
const Company = require('../model/Company');
class HotelReservation{
    #nrSingleRooms
    #nrDoubleRooms
    #comment
    #checkinDate
    #checkoutDate
    #pension
    #company

    constructor(nrSingleRooms, nrDoubleRooms, comment, checkinDate, checkoutDate, pension, company) {
        this.#nrSingleRooms = nrSingleRooms;
        this.#nrDoubleRooms = nrDoubleRooms;
        this.#comment = comment;
        this.#checkinDate = checkinDate;
        this.#checkoutDate = checkoutDate;
        this.#pension = pension;
        if(company instanceof Company){
            this.#company = company;
        } else{
            throw new Error("Company er ikke en instans af Company");
        }
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
        return this.#company;
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