//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
const Company = require('../model/Company');
class Greenfee{
    #date
    #teetime
    #nrOfGolfers
    #company
    

    constructor(date, teetime, nrOfGolfers, company){
        this.#date = date;
        this.#teetime = teetime;
        this.#nrOfGolfers = nrOfGolfers;
        if(company instanceof Company){
            this.#company = company;
        } else{
            throw new Error("Company er ikke en instans af Company");
        }
    }

    get date(){
        return this.#date;
    }

    get teetime(){
        return this.#teetime;
    }

    get nrOfGolfers(){
        return this.#nrOfGolfers;
    }

    get Company(){
        return this.#company;
    }

    set date(date){
        this.#date = date;
    }

    set teetime(teetime){
        this.#teetime = teetime;
    }

    set nrOfGolfers(nrOfGolfers){
        this.#nrOfGolfers = nrOfGolfers;
    }
}

module.exports = Greenfee;