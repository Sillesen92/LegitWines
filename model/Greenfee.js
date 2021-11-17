//Klasse med følgende forbindelser:
//Dobbeltrettet 1 Company
class Greenfee{
    #date
    #teetime
    #nrOfGolfers
    #Company
    

    constructor(date, teetime, nrOfGolfers, Company){
        this.#date = date;
        this.#teetime = teetime;
        this.#nrOfGolfers = nrOfGolfers;
        this.#Company = Company;
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
        return this.#Company;
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