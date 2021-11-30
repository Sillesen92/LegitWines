//Klasse med følgende forbindelser: 
//Enkeltrettet komposition 0..* HotelReservation
const HotelReservation = require('../model/HotelReservation');
//Enkeltrettet komposition 0..* CarRental
const CarRental = require('../model/CarRental');
//Enkeltrettet komposition 0..* Transfer
const Transfer = require('../model/Transfer');
//Enkeltrettet komposition 0..* Greenfee
const Greenfee = require('../model/Greenfee');
//Enkeltrettet komposition 1..* Boardingpass
const Boardingpass = require('./Boardingpass');
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
    #customer
    #salesman
    #travelDocuments

    constructor(bookingNr, salesman, customer) {
        this.#bookingNr = bookingNr;
        this.#contributionMargin = 18.5;
        this.#travelDocuments = [];
        this.#customer = customer;
        customer.bookings.push(this);
        this.#salesman = salesman;
        salesman.bookings.push(this);
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


    get travelDocuments() {
        return this.#travelDocuments;
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


    //Tilføjer en hotel reservation til arrayet af  travelsDocuments,
    //hvis ikke hotel reservationen allerede findes i arrayet.
    createHotelReservation(nrSingleRooms, nrDoubleRooms, comment, checkinDate, checkoutDate, pension, Company) {
        const hotelReservation = new HotelReservation(nrSingleRooms, nrDoubleRooms, comment, checkinDate, checkoutDate, pension, Company);
        if (!this.#travelDocuments.includes(hotelReservation)) {
            this.#travelDocuments.push(hotelReservation);
        }
        return hotelReservation;
    }


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

    //Tilføjer en biludlejning til arrayet af travelDocuments,
    //hvis ikke biludlejningen allerede findes i arrayet.
    createCarRental(startDate, endDate, bookingId, Company) {
        const carRental = new CarRental(startDate, endDate, bookingId, Company);
        if (!this.#travelDocuments.includes(carRental)) {
            this.#travelDocuments.push(carRental);
        } else {
            throw new Error("Reservationen findes allerede i arrayet.")
        }
        return carRental;
    }

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

    //Tilføjer en transfer til arrayet af travelDocuments,
    //hvis ikke tranferen allerede findes i arrayet.
    createTransfer(departureTime, date, destination, bookingId, Company) {
        const transfer = new Transfer(departureTime, date, destination, bookingId, Company);
        if (!this.#travelDocuments.includes(transfer)) {
            this.#travelDocuments.push(transfer);
        }
        return transfer;
    }

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

    //Tilføjer en greenfees til arrayet af travelDocuments,
    //hvis ikke denne allerede findes i arrayet.
    createGreenfee(date, teetime, nrOfGolfers, Company) {
        const greenfee = new Greenfee(date, teetime, nrOfGolfers, Company);
        if (!this.#travelDocuments.includes(greenfee)) {
            this.#travelDocuments.push(greenfee);
        }
        return greenfee;
    }

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

    //Tilføjer en passager til arrayet af travelDocuments,
    //hvis ikke denne allerede findes i arrayet.
    createBoardingpass(firstName, lastName, gender, flight) {
        const boardingpass = new Boardingpass(firstName, lastName, gender, flight);
        if (!this.#travelDocuments.includes(boardingpass)) {
            this.#travelDocuments.push(boardingpass);
        }
        return boardingpass;
    }

    //Fjerner en passager i arrayet af travelDocuments,
    //hvis passageren er tilføjet til dette.
    removeBoardingpass(boardingpass) {
        if (boardingpass instanceof Boardingpass) {
            if (this.#travelDocuments.includes(boardingpass)) {
                let i = this.#travelDocuments.indexOf(boardingpass);
                this.#travelDocuments.splice(i, 1);
            }
        } else {
            throw new Error("boardingpass er ikke en instans af Boardingpass");
        }
    }

    //Sætter Customer til en anden kunde, denne må ikke være null!
    setCustomer(customer) {
        if (customer instanceof Customer) {
            if (this.#customer != customer) {
                const oldCustomer = this.#customer;
                if (oldCustomer != undefined) {oldCustomer.removeBooking(this);}
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
                if (oldSalesman != undefined) {oldSalesman.removeBooking(this);}
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
        var price = 0;
        this.#travelDocuments.forEach(doc => {
            const docPrice = doc.calcNetPrice();
            price += docPrice;
        });
        return price;
    }

    //Udregner den samlede salgspris, 
    //netto prisen ganget med (dækningsbidrag delt med 100 + 1)
    calcGrossPrice() {
        const grossPrice = this.calcNetPrice() * (this.#contributionMargin / 100 + 1);
        return grossPrice
    }

    //Udregner dækningsbidraget i DKK ud fra den samlede pris
    calcContributionMarginInDKK() {
        return this.calcGrossPrice() - this.calcNetPrice();
    }
}


module.exports = Booking;