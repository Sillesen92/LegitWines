//Klasse med følgende forbindelser: 
//Enkeltrettet komposition 0..* HotelReservation
const HotelReservation = require('../model/HotelReservation');
//Enkeltrettet komposition 0..* CarRental
const CarRental = require('../model/CarRental');
//Enkeltrettet komposition 0..* Transfer
const Transfer = require('../model/Transfer');
//Enkeltrettet komposition 0..* Greenfee
const Greenfee = require('../model/Greenfee');
//Enkeltrettet komposition 1..* Passenger
const Passenger = require('../model/Passenger');
//Dobbeltrettet 1 Customer
const Customer = require('../model/Customer');
//Dobbeltrettet 1 Salesman
const Salesman = require('../model/Salesman');
class Booking {
    //Bookingnummeret bliver genereret af firebase YYYYXXXX
    #bookingNr
    //Contribution margin er en double imellem 0 og 100 (Procent)
    //Skal som standard være 18,5%
    #contributionMargin
    #netPrice
    #grossPrice
    #hotelReservations
    #carRentals
    #transfers
    #greenfees
    #passengers
    #customer
    #salesman
    #travelDocuments

    constructor(bookingNr, salesman, customer) {
        this.#bookingNr = bookingNr;
        this.#contributionMargin = 18, 5;
        this.#netPrice = 0;
        this.#grossPrice = 0;
        this.#hotelReservations = [];
        this.#carRentals = [];
        this.#transfers = [];
        this.#greenfees = [];
        this.#travelDocuments = [];
        if (customer instanceof Customer) {
            this.#customer = customer;
        } else {
            throw new Error("Customer er ikke en instans af Customer")
        }
        if (salesman instanceof Salesman) {
            this.#salesman = salesman;
        } else {
            throw new Error("Salesman er ikke en instans af Salesman")
        }
        this.#passengers = [];
        this.createPassenger(this.#customer.firstName, this.#customer.lastName, this.#customer.gender, false, false, false, undefined)
    }

    get bookingNr() {
        return this.#bookingNr;
    }

    get contributionMargin() {
        return this.#contributionMargin;
    }

    get salesman() {
        return this.#salesman;
    }

    get netPrice() {
        return this.#netPrice;
    }

    get grossPrice() {
        return this.#grossPrice;
    }

    get hotelReservations() {
        return this.#hotelReservations;
    }

    get carRentals() {
        return this.#carRentals;
    }

    get transfers() {
        return this.#transfers;
    }

    get greenfees() {
        return this.#greenfees;
    }

    get passengers() {
        return this.#passengers;
    }

    get customer() {
        return this.#customer;
    }

    get salesman() {
        return this.#salesman;
    }

    set bookingNr(bookingNr) {
        this.#bookingNr = bookingNr;
    }

    set contributionMargin(contributionMargin) {
        this.#contributionMargin = contributionMargin;
    }

    /*//Tilføjer en hotel reservation til arrayet af  hotel reservationer,
    //hvis ikke hotel reservationen allerede findes i arrayet.
    createHotelReservation(nrSingleRooms, nrDoubleRooms, comment, checkinDate, checkoutDate, pension, Company) {
        const hotelReservation = new HotelReservation(nrSingleRooms, nrDoubleRooms, comment, checkinDate, checkoutDate, pension, Company);
        if (!this.#hotelReservations.includes(hotelReservation)) {
            this.#hotelReservations.push(hotelReservation);
        }
    }*/

    //Tilføjer en hotel reservation til arrayet af  travelsDocuments,
    //hvis ikke hotel reservationen allerede findes i arrayet.
    createHotelReservation(nrSingleRooms, nrDoubleRooms, comment, checkinDate, checkoutDate, pension, Company) {
        const hotelReservation = new HotelReservation(nrSingleRooms, nrDoubleRooms, comment, checkinDate, checkoutDate, pension, Company);
        if (!this.#travelDocuments.includes(hotelReservation)) {
            this.#travelDocuments.push(hotelReservation);
        }
    }

    /* //Fjerne en reservation i arrayet af reservationer,
     //hvis reservationen er tilføjet til dette.
     removeHotelReservation(hotelReservation) {
         if (hotelReservation instanceof HotelReservation) {
             if (this.#hotelReservations.includes(hotelReservation)) {
                 let i = this.#hotelReservations.indexOf(hotelReservation);
                 for (let index = i; index < this.#hotelReservations.length - 1; index++) {
                     this.#hotelReservations[index] = this.#hotelReservations[index + 1];
                 }
                 this.#hotelReservations.length = this.#hotelReservations.length - 1;
             }
         } else {
             throw new Error("Hotel reservationen er ikke en instans af HotelReservation")
         }
     }*/

    //Fjerne en reservation i arrayet af travelDocuments,
    //hvis reservationen er tilføjet til dette.
    removeHotelReservation(hotelReservation) {
        if (hotelReservation instanceof HotelReservation) {
            if (this.#travelDocuments.includes(hotelReservation)) {
                let i = this.#travelDocuments.indexOf(hotelReservation);
                for (let index = i; index < this.#travelDocuments.length - 1; index++) {
                    this.#travelDocuments[index] = this.#travelDocuments[index + 1];
                }
                this.#travelDocuments.length = this.#travelDocuments.length - 1;
            }
        } else {
            throw new Error("Hotel reservationen er ikke en instans af HotelReservation")
        }
    }

    /*//Tilføjer en biludlejning til arrayet af biludlejninger,
    //hvis ikke biludlejningen allerede findes i arrayet.
    createCarRental(startDate, endDate, bookingId, Company) {
        const carRental = new CarRental(startDate, endDate, bookingId, Company);
        if (!this.#carRentals.includes(carRental)) {
            this.#carRentals.push(carRental);
        }
    } */

    //Tilføjer en biludlejning til arrayet af travelDocuments,
    //hvis ikke biludlejningen allerede findes i arrayet.
    createCarRental(startDate, endDate, bookingId, Company) {
        const carRental = new CarRental(startDate, endDate, bookingId, Company);
        if (!this.#travelDocuments.includes(carRental)) {
            this.#travelDocuments.push(carRental);
        } else {
            throw new Error("Reservationen findes allerede i arrayet.")
        }
    }

    /* //Fjerner en biludlejning i arrayet af biludlejninger,
     //hvis biludlejningen er tilføjet til dette.
     removeCarRental(carRental) {
         if (carRental instanceof CarRental) {
             if (this.#carRentals.includes(carRental)) {
                 let i = this.#carRentals.indexOf(carRental);
                 for (let index = i; index < this.#carRentals.length - 1; index++) {
                     this.#carRentals[index] = this.#carRentals[index + 1];
                 }
                 this.#carRentals.length = this.#carRentals.length - 1;
             }
         } else {
             throw new Error("Biludlejningen er ikke en instans af CarRental");
         }
     } */

    //Fjerner en biludlejning i arrayet af travelDocuments,
    //hvis biludlejningen er tilføjet til dette.
    removeCarRental(carRental) {
        if (carRental instanceof CarRental) {
            if (this.#travelDocuments.includes(carRental)) {
                let i = this.#travelDocuments.indexOf(carRental);
                for (let index = i; index < this.#travelDocuments.length - 1; index++) {
                    this.#travelDocuments[index] = this.#travelDocuments[index + 1];
                }
                this.#travelDocuments.length = this.#travelDocuments.length - 1;
            }
        } else {
            throw new Error("Biludlejningen er ikke en instans af CarRental");
        }
    }

    /* //Tilføjer en transfer til arrayet af transfers,
    //hvis ikke tranferen allerede findes i arrayet.
    createTransfer(departureTime, date, destination, bookingId, Company) {
        const transfer = new Transfer(departureTime, date, destination, bookingId, Company);
        if (!this.#transfers.includes(transfer)) {
            this.#transfers.push(transfer);
        }
    } */

    //Tilføjer en transfer til arrayet af travelDocuments,
    //hvis ikke tranferen allerede findes i arrayet.
    createTransfer(departureTime, date, destination, bookingId, Company) {
        const transfer = new Transfer(departureTime, date, destination, bookingId, Company);
        if (!this.#travelDocuments.includes(transfer)) {
            this.#travelDocuments.push(transfer);
        }
    }

    /*  //Fjerner en transfer i arrayet af transfers,
      //hvis transferen er tilføjet til dette.
      removeTransfer(transfer) {
          if (transfer instanceof Transfer) {
              if (this.#transfers.includes(transfer)) {
                  let i = this.#transfers.indexOf(transfer);
                  for (let index = i; index < this.#transfers.length - 1; index++) {
                      this.#transfers[index] = this.#transfers[index + 1];
                  }
                  this.#transfers.length = this.#transfers.length - 1;
              }
          } else {
              throw new Error("transfer er ikke en instans af Transfer");
          }
      } */

    //Fjerner en transfer i arrayet af travelDocuments,
    //hvis transferen er tilføjet til dette.
    removeTransfer(transfer) {
        if (transfer instanceof Transfer) {
            if (this.#travelDocuments.includes(transfer)) {
                let i = this.#travelDocuments.indexOf(transfer);
                for (let index = i; index < this.#travelDocuments.length - 1; index++) {
                    this.#travelDocuments[index] = this.#travelDocuments[index + 1];
                }
                this.#travelDocuments.length = this.#travelDocuments.length - 1;
            }
        } else {
            throw new Error("transfer er ikke en instans af Transfer");
        }
    }

    /*   //Tilføjer en greenfees til arrayet af greenfees,
       //hvis ikke denne allerede findes i arrayet.
       createGreenfee(date, teetime, nrOfGolfers, Company) {
           const greenfee = new Greenfee(date, teetime, nrOfGolfers, Company);
           if (!this.#greenfees.includes(greenfee)) {
               this.#greenfees.push(greenfee);
           }
       } */

    //Tilføjer en greenfees til arrayet af travelDocuments,
    //hvis ikke denne allerede findes i arrayet.
    createGreenfee(date, teetime, nrOfGolfers, Company) {
        const greenfee = new Greenfee(date, teetime, nrOfGolfers, Company);
        if (!this.#travelDocuments.includes(greenfee)) {
            this.#travelDocuments.push(greenfee);
        }
    }

    /*  //Fjerner en greenfee i arrayet af greenfees,
      //hvis denne er tilføjet til dette.
      removeGreenfee(greenfee) {
          if (greenfee instanceof Greenfee) {
              if (this.#greenfees.includes(greenfee)) {
                  let i = this.#greenfees.indexOf(greenfee);
                  for (let index = i; index < this.#greenfees.length - 1; index++) {
                      this.#greenfees[index] = this.#greenfees[index + 1];
                  }
                  this.#greenfees.length = this.#greenfees.length - 1;
              }
          } else {
              throw new Error("greenfee er ikke en instans af Greenfee");
          }
      } */

    //Fjerner en greenfee i arrayet af travelDocuments,
    //hvis denne er tilføjet til dette.
    removeGreenfee(greenfee) {
        if (greenfee instanceof Greenfee) {
            if (this.#travelDocuments.includes(greenfee)) {
                let i = this.#travelDocuments.indexOf(greenfee);
                for (let index = i; index < this.#travelDocuments.length - 1; index++) {
                    this.#travelDocuments[index] = this.#travelDocuments[index + 1];
                }
                this.#travelDocuments.length = this.#travelDocuments.length - 1;
            }
        } else {
            throw new Error("greenfee er ikke en instans af Greenfee");
        }
    }

    /*  //Tilføjer en passager til arrayet af passagerer,
      //hvis ikke denne allerede findes i arrayet.
      createPassenger(firstName, lastName, gender, meal, golfbag, luggage, Flight) {
          const passenger = new Passenger(firstName, lastName, gender, meal, golfbag, luggage, Flight);
          if (!this.#passengers.includes(passenger)) {
              this.#passengers.push(passenger);
          }
      } */

    //Tilføjer en passager til arrayet af travelDocuments,
    //hvis ikke denne allerede findes i arrayet.
    createPassenger(firstName, lastName, gender, meal, golfbag, luggage, Flight) {
        const passenger = new Passenger(firstName, lastName, gender, meal, golfbag, luggage, Flight);
        if (!this.#travelDocuments.includes(passenger)) {
            this.#travelDocuments.push(passenger);
        }
    }

    /*
    //Fjerner en passager i arrayet af passagerer,
    //hvis passageren er tilføjet til dette.
    //præbetingelse: Der skal minimum være to passagerer i arrayet
    removePassenger(passenger) {
        if (passenger instanceof Passenger) {
            if (this.#passengers.includes(passenger) && this.#passengers.length > 1) {
                let i = this.#passengers.indexOf(passenger);
                for (let index = i; index < this.#passengers.length - 1; index++) {
                    this.#passengers[index] = this.#passengers[index + 1];
                }
                this.#passengers.length = this.#passengers.length - 1;
            }
        } else {
            throw new Error("passageren er ikke en instans af Passenger");
        }
    } */


    //private hjælpe metode til at afgøre om travelDocuments indeholder mindst to passengers
    #numberOfPassengers() {
        var numberOfPassengers = 0;
        for (let i = 0; i < this.#travelDocuments.length; i++) {
            if (this.#travelDocuments[i] instanceof Passenger) {
                numberOfPassengers++;
            }
        }
        return numberOfPassengers
    }
    //Fjerner en passager i arrayet af travelDocuments,
    //hvis passageren er tilføjet til dette.
    //præbetingelse: Der skal minimum være to passagerer i arrayet
    removePassenger(passenger) {
        if (passenger instanceof Passenger) {
            if (this.#travelDocuments.includes(passenger) && this.#numberOfPassengers() >= 2) {
                let i = this.#travelDocuments.indexOf(passenger);
                this.#travelDocuments.splice(i, 1);
            }
        } else {
            throw new Error("passageren er ikke en instans af Passenger");
        }
    }

    //Sætter Customer til en anden kunde, denne må ikke være null!
    setCustomer(customer) {
        if (customer instanceof Customer) {
            if (this.#customer != customer) {
                const oldCustomer = this.#customer;
                oldCustomer.removeBooking(this);
                this.#customer = customer;
                this.#customer.addBooking(this);
            }
        } else {
            throw new Error("Du skal angive en kunde, der er forskellig fra den kunde du allerede har på bookingen");
        }
    }

    //Sætter sælger til en anden sælger, denne må ikke være null!
    setSalesmman(salesman) {
        if (salesman instanceof Salesman) {
            if (this.#salesman != salesman) {
                const oldSalesman = this.#salesman;
                oldSalesman.removeBooking(this);
                this.#salesman = salesman;
                this.#salesman.addBooking(this);
            }
        } else {
            throw new Error("Du skal angive en sælger, der er forskellig fra den sælger du allerede har på bookingen");
        }
    }

    //Udregner den samlede kostpris, ud fra
    //nettopriserne hos de valgte samarbejdspartnere
    calcNetPrice() {
        this.#netPrice = 0;
        return this.#netPrice;
    }

    //Udregner den samlede salgspris, 
    //netto prisen ganget med (dækningsbidrag delt med 100 + 1)
    calcGrossPrice() {
        this.#grossPrice = this.#netPrice * (this.#contributionMargin / 100 + 1);
        return this.#grossPrice;
    }

    //Udregner dækningsbidraget i DKK ud fra den samlede pris
    calcContributionMarginInDKK() {
        return this.#grossPrice - this.#netPrice;
    }
}

module.exports = Booking;