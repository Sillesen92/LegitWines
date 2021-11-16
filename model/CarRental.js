//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
class CarRental{
    #startDate
    #endDate
    #bookingId
    #Company

    constructor(startDate, endDate, bookingId, Company){
        this.#startDate = startDate;
        this.#endDate = endDate;
        this.#bookingId = bookingId;
        this.#Company = Company;
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
        return this.#Company;
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