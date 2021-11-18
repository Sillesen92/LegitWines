//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Flight
const Flight = require('../model/Flight');
class Passenger{
    #firstName
    #lastName
    #gender
    #meal
    #golfbag
    #luggage
    #Flight//Nullable

    constructor(firstName, lastName, gender, meal, golfbag, luggage, Flight){
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#gender = gender;
        this.#meal = meal;
        this.#golfbag = golfbag;
        this.#luggage = luggage;
        this.#Flight = Flight;
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

    get flight(){
        return this.#Flight;
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

    set Flight(flight){
        if(flight instanceof Flight){
            this.#Flight = flight;
        } else{
            throw new Error("flight er ikke en instans af Flight");
        }
    }
}

module.exports = Passenger;