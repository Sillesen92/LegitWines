//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
// Dobbeltrettet 1 Booking
class Transfer {
    #departureTime
    #date
    #destination
    #bookingId
    #Company
    #Booking

    constructor(departureTime, date, destination, bookingId, Company, Booking) {
        this.#departureTime = departureTime;
        this.#date = date;
        this.#destination = destination;
        this.#bookingId = bookingId;
        this.#Company = Company;
        this.#Booking = Booking;
    }

    get departureTime() {
        return this.#departureTime;
    }

    get date() {
        return this.#date;
    }

    get destination() {
        return this.#destination;
    }

    get bookingId() {
        return this.#bookingId;
    }

    get Company() {
        return this.#company;
    }

    get booking() {
        return this.#Booking;
    }

    set departureTime(departureTime) {
        this.#departureTime = departureTime;
    }

    set date(date) {
        this.#date = date;
    }

    set destination(destination) {
        this.#destination = destination;
    }

    set bookingId(bookingId) {
        this.#bookingId = bookingId;
    }

    //Sætter Company til et andet Company, denne må ikke være null!
    setCompany(Company) {
        if (this.#Company != Company && Company != undefined) {
            const oldCompany = this.#Company;
            oldCompany.removeTransfer(this);
            this.#Company = Company;
            this.#Company.addTransfer(this);
        } else {
            throw new Error("Du skal angive en virksomhed, der er forskellig fra den virksomhed du allerede har tilknyttet transferen");
        }
    }

    //Sætter Booking til en anden Booking, denne må ikke være null!
    setBooking(Booking) {
        if (this.#Booking != Booking && Booking != undefined) {
            const oldBooking = this.#Booking;
            oldBooking.removeTransfer(this);
            this.#Booking = Booking;
            this.#Booking.addTransfer(this);
        } else {
            throw new Error("Du skal angive en booking, der er forskellig fra den booking du allerede har tilknyttet transferen");
        }
    }
}

module.exports = Transfer;