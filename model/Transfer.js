//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
class Transfer{
    #departureTime
    #date
    #destination
    #bookingId
    #Company

    constructor(departureTime, date, destination, bookingId, Company) {
        this.#departureTime = departureTime;
        this.#date = date;
        this.#destination = destination;
        this.#bookingId = bookingId;
        this.#Company = Company;
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