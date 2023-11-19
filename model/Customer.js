import { Person } from "./Person.js";

export class Customer extends Person{
    constructor(){
        super()
        this.companyName = ''
        this.billValue = 0
        this.rate = 0
    }
}