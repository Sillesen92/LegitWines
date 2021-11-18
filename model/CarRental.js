//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
const Company = require('../model/Company');
class CarRental{
    #startDate
    #endDate
    #bookingId
    #company

    constructor(startDate, endDate, bookingId, company){
        this.#startDate = startDate;
        this.#endDate = endDate;
        this.#bookingId = bookingId;
        if(company instanceof Company){
            this.#company = company;
        } else{
            throw new Error("Company er ikke en instans af Company");
        }
    }

    get startDate(){
        return this.#startDate;
    }

    get endDate(){
        return this.#endDate;
    }

    get bookingId(){
        return this.#bookingId;
    }

    get company(){
        return this.#company;
    }

    set startDate(startDate){
        this.#startDate = startDate;
    }

    set endDate(endDate){
        this.#endDate = endDate;
    }

    set bookingId(bookingId){
        this.#bookingId = bookingId;
    }
}

module.exports = CarRental;