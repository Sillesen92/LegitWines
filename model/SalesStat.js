const Booking = require('./Booking')
const Customer = require('./Customer')
const Salesman = require('./Salesman')
const salesmanC = require('./Salesman')
class SalesStat{
    #Salesman
    #netSales
    #grossSales
    #contributionMargin


    constructor (salesman){
        this.#Salesman = salesman;
        this.#netSales = salesman;
        this.#grossSales = 0;
        this.#contributionMargin = 0;
    }


    //metode til at sætte sales rigtigt
    setSalesAtt(salesman){
        
       let stats = salesman.getSalesStatistics()
       let statsObj = JSON.parse(stats)
       this.#netSales = statsObj.netSales
       this.#grossSales = statsObj.grossSales
       this.#contributionMargin = statsObj.contributionMargin
    }
}