//Klasse med følgende forbindelser: 
//Dobbeltrettet 0..* HotelReservation
//Dobbeltrettet 0..* CarRental
//Dobbeltrettet 0..* Transfer
//Dobbeltrettet 0..* Greenfee
//Dobbeltrettet 0..* Flight
//Enkeltrettet 0..* Contract
const Contract = require('../model/Contract')
class Company{
    #name
    #address
    #email
    #phone
    #businessType
    #hotelReservations
    #carRentals
    #transfers
    #greenfees
    #flights
    #contracts

    constructor(name, address, email, phone, businessType){
        this.#name = name;
        this.#address = address;
        this.#email = email;
        this.#phone = phone;
        this.#businessType = businessType;
        this.#hotelReservations = [];
        this.#carRentals = [];
        this.#transfers = [];
        this.#greenfees = [];
        this.#flights = [];
        this.#contracts = [];
    }

    get name(){
        return this.#name;
    }

    get address(){
        return this.#address;
    }

    get email(){
        return this.#email;
    }

    get phone(){
        return this.#phone;
    }

    get businessType(){
        return this.#businessType;
    }

    get hotelReservations(){
        return this.#hotelReservations;
    }
    
    get carRentals(){
        return this.#carRentals;
    }
    
    get transfers(){
        return this.#transfers;
    }
    
    get greenfees(){
        return this.#greenfees;
    }
    
    get flights(){
        return this.#flights;
    }

    get contracts(){
        return this.#contracts;
    }

    //Tilføjer en hotel reservation til arrayet af  hotel reservationer,
    //hvis ikke hotel reservationen allerede findes i arrayet.
    addHotelReservation(hotelReservation){
        if(!this.#hotelReservations.includes(hotelReservation)){
            this.#hotelReservations.push(hotelReservation);
        }
    }

    //Fjerne en reservation i arrayet af reservationer,
    //hvis reservationen er tilføjet til dette.
    removeHotelReservation(hotelReservation){
        if(this.#hotelReservations.includes(hotelReservation)){
            let i = this.#hotelReservations.indexOf(hotelReservation);
            for(let index = i; index < this.#hotelReservations.length - 1; index++){
                this.#hotelReservations[index] = this.#hotelReservations[index + 1];
            }
            this.#hotelReservations.length = this.#hotelReservations.length - 1;
        }
    }

    //Tilføjer en biludlejning til arrayet af biludlejninger,
    //hvis ikke biludlejningen allerede findes i arrayet.
    addCarRental(carRental){
        if(!this.#carRentals.includes(carRental)){
            this.#carRentals.push(carRental);
        }
    }

    //Fjerner en biludlejning i arrayet af biludlejninger,
    //hvis biludlejningen er tilføjet til dette.
    removeCarRental(carRental){
        if(this.#carRentals.includes(carRental)){
            let i = this.#carRentals.indexOf(carRental);
            for(let index = i; index < this.#carRentals.length - 1; index++){
                this.#carRentals[index] = this.#carRentals[index + 1];
            }
            this.#carRentals.length = this.#carRentals.length - 1;
        }
    }

    //Tilføjer en transfer til arrayet af transfers,
    //hvis ikke tranferen allerede findes i arrayet.
    addTransfer(transfer){
        if(!this.#transfers.includes(transfer)){
            this.#transfers.push(transfer);
        }
    }

    //Fjerner en transfer i arrayet af transfers,
    //hvis transferen er tilføjet til dette.
    removeTransfer(transfer){
        if(this.#transfers.includes(transfer)){
            let i = this.#transfers.indexOf(transfer);
            for(let index = i; index < this.#transfers.length - 1; index++){
                this.#transfers[index] = this.#transfers[index + 1];
            }
            this.#transfers.length = this.#transfers.length - 1;
        }
    }

    //Tilføjer en greenfees til arrayet af greenfees,
    //hvis ikke denne allerede findes i arrayet.
    addGreenfee(greenfee){
        if(!this.#greenfees.includes(greenfee)){
            this.#greenfees.push(greenfee);
        }
    }

    //Fjerner en greenfee i arrayet af greenfees,
    //hvis denne er tilføjet til dette.
    removeGreenfee(greenfee){
        if(this.#greenfee.includes(greenfee)){
            let i = this.#greenfees.indexOf(greenfee);
            for(let index = i; index < this.#greenfees.length - 1; index++){
                this.#greenfees[index] = this.#greenfees[index + 1];
            }
            this.#greenfees.length = this.#greenfees.length - 1;
        }
    }

    //Tilføjer en flyafgang til arrayet af flights,
    //hvis ikke den allerede findes i arrayet.
    addFlight(flight){
        if(!this.#flights.includes(flight)){
            this.#flights.push(flight);
        }
    }

    //Fjerner en flyafgang i arrayet af flights,
    //hvis denne er tilføjet til dette.
    removeFlight(flight){
        if(this.#flight.includes(flight)){
            let i = this.#flights.indexOf(flight);
            for(let index = i; index < this.#flights.length - 1; index++){
                this.#flights[index] = this.#flights[index + 1];
            }
            this.#flights.length = this.#flights.length - 1;
        }
    }

    //Tilføjer en kontrakt til arrayet af contracts,
    //Hvis ikke den allerede findes i arrayet.
    createContract(description, startDate, endDate, netPrice){
        const contract = new Contract(description, startDate, endDate, netPrice);
        if(!this.#contracts.includes(contract)){
            this.#contracts.push(contract);
        }
    }

    //Fjerner en kontrakt i arrayet af contracts,
    //hvis denne er tilføjet til dette.
    removeContract(contract){
        if(this.#contracts.includes(contract)){
            let i = this.#contracts.indexOf(contract);
            for(let index = i; index < this.#contracts.length - 1; index++){
                this.#contracts[index] = this.#contracts[index + 1];
            }
            this.#contracts.length = this.#contracts.length - 1;
        }
    }
}

module.exports = Company;