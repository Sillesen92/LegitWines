//Klasse uden forbindelser
class Contract{
    #description
    #startDate
    #endDate
    #netPrice

    constructor(description, startDate, endDate, netPrice) {
        this.#description = description;
        this.#startDate = startDate;
        this.#endDate = endDate;
        this.#netPrice = netPrice;
    }

    get description(){
        return this.#description;
    }

    get startDate(){
        return this.#startDate;
    }

    get endDate(){
        return this.#endDate;
    }

    get netPrice(){
        return this.#netPrice;
    }

    set description(description) {
        this.#description = description;
    }

    set startDate(startDate) {
        this.#startDate = startDate;
    }

    set endDate(endDate) {
        this.#endDate = endDate;
    }

    set netPrice(netPrice) {
        this.#netPrice = netPrice;
    }
}

module.exports = Contract;