//Klasse med følgende forbindelser: 
//Enkeltrettet 0..* Reservation
//Enkeltrettet 0..* CarRental
//Enkeltrettet 0..* Transfer
//Enkeltrettet 0..* Greenfee
//Enkeltrettet 1..* Passenger
//Dobbeltrettet 1 Customer
//Dobbeltrettet 1 Salesman
class Booking{
    //Bookingnummeret bliver genereret af firebase YYYYXXXX
    #bookingNr
    //Contribution margin er en double imellem 0 og 100 (Procent)
    #contributionMargin
    #grossPrice
    #reservations
    #carRentals
    #transfers
    #greenfees
    #passengers
    #customer
    #salesman
    
    constructor(bookingNr, contributionMargin, salesman, customer){
        this.#bookingNr = bookingNr;
        this.#contributionMargin = contributionMargin;
        this.#salesman = salesman;
        this.#grossPrice = 0;
        this.#reservations = [];
        this.#carRentals = [];
        this.#transfers = [];
        this.#greenfees = [];
        this.#customer = customer;
        this.#passengers = [customer];
    }
    
    get bookingNr(){
        return this.#bookingNr;
    }

    get contributionMargin(){
        return this.#contributionMargin;
    }

    get salesman(){
        return this.#salesman;
    }
    
    get grossPrice(){
        return this.#grossPrice;
    }
    
    get reservations(){
        return this.#reservations;
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
    
    get passengers(){
        return this.#passengers;
    }

    get customer(){
        return this.#customer;
    }

    set bookingNr(bookingNr){
        this.#bookingNr = bookingNr;
    }

    set contributionMargin(contributionMargin){
        this.#contributionMargin = contributionMargin;
    }

    //Tilføjer en reservation til arrayet af reservationer,
    //hvis ikke reservationen allerede findes i arrayet.
    addReservation(reservation){
        if(!this.#reservations.includes(reservation)){
            this.#reservations.push(reservation);
        }
    }

    //Fjerne en reservation i arrayet af reservationer,
    //hvis reservationen er tilføjet til dette.
    removeReservation(reservation){
        if(this.#reservations.includes(reservation)){
            let i = this.#reservations.indexOf(reservation);
            for(let index = i; index < this.#reservations.length - 1; index++){
                this.#reservations[index] = this.#reservations[index + 1];
            }
            this.#reservations.length = this.#reservations.length - 1;
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

    //Tilføjer en passager til arrayet af passagerer,
    //hvis ikke denne allerede findes i arrayet.
    addPassenger(passenger){
        if(!this.#passenger.includes(passenger)){
            this.#passengers.push(passenger);
        }
    }

    //Fjerner en passager i arrayet af passagerer,
    //hvis passageren er tilføjet til dette.
    //præbetingelse: Der skal minimum være to passagerer i arrayet
    removePassenger(passenger){
        if(this.#passengers.includes(passenger) && this.#passengers.length > 1){
            let i = this.#passengers.indexOf(passenger);
            for(let index = i; index < this.#passengers.length - 1; index++){
                this.#passengers[index] = this.#passengers[index + 1];
            }
            this.#passengers.length = this.#passengers.length - 1;
        }
    }

    //Sætter Customer til en anden kunde, denne må ikke være null!
    setCustomer(customer){
        if(this.#customer != customer && customer != undefined){
            const oldCustomer = this.#customer;
            oldCustomer.removeBooking(this);
            this.#customer = customer;
            this.#customer.addBooking(this);
        } else{
            throw new Error("Du skal angive en kunde, der er forskellig fra den kunde du allerede har på bookingen");
        }
    }

    //Sætter sælger til en anden sælger, denne må ikke være null!
    setSalesmman(salesman){
        if(this.#salesman != salesman && customer != undefined){
            const oldSalesman = this.#salesman;
            oldSalesman.removeBooking(this);
            this.#salesman = salesman;
            this.#salesman.addBooking(this);
        } else{
            throw new Error("Du skal angive en sælger, der er forskellig fra den sælger du allerede har på bookingen");
        }
    }

    //Udregner den samlede salgspris, 
    //ud fra nettoprisen i de valgte samarbejdspartnere
    calcGrossPrice() {
        grossPrice = 0;
    }
}

module.exports = Booking;