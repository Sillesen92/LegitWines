//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
const Company = require('../model/Company');
class Transfer{
    #departureTime
    #date
    #destination
    #bookingId
    #company

    constructor(departureTime, date, destination, bookingId, company) {
        this.#departureTime = departureTime;
        this.#date = date;
        this.#destination = destination;
        this.#bookingId = bookingId;
        if(company instanceof Company){
            this.#company = company;
        } else{
            throw new Error("Company er ikke en instans af Company");
        }
   }

   get departureTime(){
       return this.#departureTime;
   }

   get date(){
       return this.#date;
   }

   get destination(){
       return this.#destination;
   }

   get bookingId(){
       return this.#bookingId;
   }

   get Company(){
       return this.#company;
   }

   set departureTime(departureTime){
       this.#departureTime = departureTime;
   }

   set date(date){
       this.#date = date;
   }

   set destination(destination){
       this.#destination = destination;
   }

   set bookingId(bookingId){
       this.#bookingId = bookingId;
   }
}

module.exports = Transfer;