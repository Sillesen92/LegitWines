//Klasse med følgende forbindelser:
//Dobbeltrettet 0..* Flight
const Flight = require('../model/Flight');
class Passenger{
    #firstName
    #lastName
    #gender
    #meal
    #golfbag
    #luggage
    #flights

    constructor(firstName, lastName, gender, meal, golfbag, luggage){
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#gender = gender;
        this.#meal = meal;
        this.#golfbag = golfbag;
        this.#luggage = luggage;
        this.#flights = [];
    }

    get firstName(){
        return this.#firstName;
    }

    get lastName(){
        return this.#lastName;
    }

    get gender(){
        return this.#gender;
    }

    get meal(){
        return this.#meal;
    }

    get golfbag(){
        return this.#golfbag;
    }

    get luggage(){
        return this.#luggage;
    }

    get flights(){
        return this.#flights;
    }

    set firstName(firstName){
        this.#firstName = firstName;
    }

    set lastName(lastName){
        this.#lastName = lastName;
    }

    set gender(gender){
        this.#gender = gender;
    }

    set meal(meal){
        this.#meal = meal;
    }

    set golfbag(golfbag){
        this.#golfbag = golfbag;
    }

    set luggage(luggage){
        this.#luggage = luggage;
    }

    addFlight(flight){
        if (flight instanceof Flight) {
            if (!this.#flights.includes(flight)) {
                this.#flights.push(flight);
                flight.addPassenger(this);
            }
        } else {
            throw new Error("passenger er ikke en instans af Passenger")
        }
    }

    removeFlight(flight){
        if (flight instanceof Flight) {
            if (this.#flights.includes(flight)) {
                let i = this.#flights.indexOf(flight);
                for (let index = i; index < this.#flights.length - 1; index++) {
                    this.#flights[index] = this.#flights[index + 1];
                }
                this.#flights.length = this.#flights.length - 1;
                flight.removePassenger(this);
            }
        } else {
            throw new Error("passenger er ikke en instans af Passenger")
        }
    }
}

module.exports = Passenger;