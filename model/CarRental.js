//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
// Dobbeltrettet 1 Booking
class CarRental {
    #startDate
    #endDate
    #bookingId
    #Company
    #Booking

    constructor(startDate, endDate, bookingId, Company, Booking) {
        this.#startDate = startDate;
        this.#endDate = endDate;
        this.#bookingId = bookingId;
        this.#Company = Company;
        this.#Booking = Booking;
    }

    get startDate() {
        return this.#startDate;
    }

    get endDate() {
        return this.#endDate;
    }

    get bookingId() {
        return this.#bookingId;
    }

    get company() {
        return this.#Company;
    }

    get booking() {
        return this.#Booking;
    }

    set startDate(startDate) {
        this.#startDate = startDate;
    }

    set endDate(endDate) {
        this.#endDate = endDate;
    }

    set bookingId(bookingId) {
        this.#bookingId = bookingId;
    }
    //Sætter Company til et andet Company, denne må ikke være null!
    setCompany(Company) {
        if (this.#Company != Company && Company != undefined) {
            const oldCompany = this.#Company;
            oldCompany.removeCarRental(this);
            this.#Company = Company;
            this.#Company.addCarRental(this);
        } else {
            throw new Error("Du skal angive en virksomhed, der er forskellig fra den virksomhed du allerede har tilknyttet billejen");
        }
    }

    //Sætter Booking til en anden Booking, denne må ikke være null!
    setBooking(Booking) {
        if (this.#Booking != Booking && Booking != undefined) {
            const oldBooking = this.#Booking;
            oldBooking.removeCarRental(this);
            this.#Booking = Booking;
            this.#Booking.addCarRental(this);
        } else {
            throw new Error("Du skal angive en booking, der er forskellig fra den booking du allerede har tilknyttet billejen");
        }
    }
}

module.exports = CarRental;