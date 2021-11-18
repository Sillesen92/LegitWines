//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
// Dobbeltrettet 1 Booking
class Greenfee {
    #date
    #teetime
    #nrOfGolfers
    #Company
    #Booking


    constructor(date, teetime, nrOfGolfers, Company, Booking) {
        this.#date = date;
        this.#teetime = teetime;
        this.#nrOfGolfers = nrOfGolfers;
        this.#Company = Company;
        this.#Booking = Booking;
    }

    get date() {
        return this.#date;
    }

    get teetime() {
        return this.#teetime;
    }

    get nrOfGolfers() {
        return this.#nrOfGolfers;
    }

    get Company() {
        return this.#Company;
    }

    get booking() {
        return this.#Booking;
    }

    set date(date) {
        this.#date = date;
    }

    set teetime(teetime) {
        this.#teetime = teetime;
    }

    set nrOfGolfers(nrOfGolfers) {
        this.#nrOfGolfers = nrOfGolfers;
    }
    //Sætter Company til et andet Company, denne må ikke være null!
    setCompany(Company) {
        if (this.#Company != Company && Company != undefined) {
            const oldCompany = this.#Company;
            oldCompany.removeGreenfee(this);
            this.#Company = Company;
            this.#Company.addGreenfee(this);
        } else {
            throw new Error("Du skal angive en virksomhed, der er forskellig fra den virksomhed du allerede har tilknyttet greenfee'en");
        }
    }

    //Sætter Booking til en anden Booking, denne må ikke være null!
    setBooking(Booking) {
        if (this.#Booking != Booking && Booking != undefined) {
            const oldBooking = this.#Booking;
            oldBooking.removeGreenfee(this);
            this.#Booking = Booking;
            this.#Booking.addGreenfee(this);
        } else {
            throw new Error("Du skal angive en booking, der er forskellig fra den booking du allerede har tilknyttet greenfee'en");
        }
    }
}

module.exports = Greenfee;