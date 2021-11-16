//Klasse med følgende forbindelser:
//Dobbeltrettet ..* Passenger
//Dobbeltrettet 1 Company
class Flight{
    #departAirport
    #date
    #time
    #arrivalAirport
    #flightNr
    #passengers
    #Company

    constructor(departAirport, date, time, arrivalAirport, flightNr, Company){
        this.#departAirport = departAirport;
        this.#date = date;
        this.#time = time;
        this.#arrivalAirport = arrivalAirport;
        this.#flightNr = flightNr;
        this.#passengers = [];
        this.#Company = Company;
    }

    get departAirport(){
        return this.#departAirport;
    }

    get date() {
        return this.#date;
    }

    get time() {
        return this.#time;
    }

    get arrivalAirport() {
        return this.#arrivalAirport;
    }

    get flightNr() {
        return this.#flightNr;
    }

    get passengers() {
        return this.#passengers;
    }

    get company() {
        return this.#Company;
    }

    set departAirport(departAirport){
        this.#departAirport = departAirport;
    }

    set date(date){
        this.#date = date;
    }

    set time(time){
        this.#time = time;
    }

    set arrivalAirport(arrivalAirport){
        this.#arrivalAirport = arrivalAirport;
    }

    set flightNr(flightNr){
        this.#flightNr = flightNr;
    }

    //Tilføjer en passager til arrayet af passagerer,
    //hvis ikke denne allerede findes i arrayet.
    addPassenger(passenger){
        if(!this.#passenger.includes(passenger)){
            this.#passengers.push(passenger);
        }
    }

    //Fjerner en passager i arrayet af passagerer,
    //hvis passageren er tilføjet til dette.
    removePassenger(passenger){
        if(this.#passengers.includes(passenger)){
            let i = this.#passengers.indexOf(passenger);
            for(let index = i; index < this.#passengers.length - 1; index++){
                this.#passengers[index] = this.#passengers[index + 1];
            }
            this.#passengers.length = this.#passengers.length - 1;
        }
    }
}

module.exports = Flight;