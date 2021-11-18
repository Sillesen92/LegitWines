//Klasse med følgende forbindelser:
//Dobbeltrettet 0..* Booking
const Booking = require('../model/Booking');
class Customer {
    #firstName
    #lastName
    #email
    #gender
    #address
    #phoneNr
    #dguNr
    #bookings

    constructor(firstName, lastName, email, gender, address, phoneNr, dguNr) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#gender = gender;
        this.#address = address;
        this.#phoneNr = phoneNr;
        this.#dguNr = dguNr;
        this.#bookings = [];
    }

    get firstName() {
        return this.#firstName;
    }

    get lastName() {
        return this.#lastName;
    }

    get email() {
        return this.#email;
    }

    get gender() {
        return this.#gender;
    }

    get address() {
        return this.#address;
    }

    get phoneNr() {
        return this.#phoneNr;
    }

    get dguNr() {
        return this.#dguNr;
    }

    get bookings() {
        return this.#bookings;
    }

    set firstName(firstName) {
        this.#firstName = firstName;
    }

    set lastName(lastName) {
        this.#lastName = lastName;
    }

    set email(email) {
        this.#email = email;
    }

    set gender(gender) {
        this.#gender = gender;
    }

    set address(address) {
        this.#address = address;
    }

    set phoneNr(phoneNr) {
        this.#phoneNr = phoneNr;
    }

    set dguNr(dguNr) {
        this.#dguNr = dguNr;
    }

    //Tilføjer en booking til arrayet af bookinger,
    //hvis ikke denne allerede findes i arrayet.
    addBooking(booking) {
        if (booking instanceof Booking) {
            if (!this.#bookinger.includes(booking)) {
                this.#bookinger.push(booking);
                booking.setSalesman(this);
            }
        } else {
            throw new Error("booking er ikke en instans af Booking");
        }
    }

    //Fjerner en booking fra arrayet af bookinger,
    //hvis denne allerede er i arrayet.
    removeBooking(booking) {
        if (booking instanceof Booking) {
            if (this.#bookinger.includes(booking)) {
                let i = this.#bookinger.indexOf(booking);
                for (let index = i; index < this.#bookinger.length - 1; index++) {
                    this.#bookinger[index] = this.#bookinger[index + 1];
                }
                this.#bookinger.length = this.#bookinger.length - 1;
            }
        } else{
            throw new Error("booking er ikke en instans af Booking");
        }
    }
}

module.exports = Customer;