import { Person } from "./Person.js";

export class Employee extends Person{
    constructor(){
        super()
        this.workingHour = 0
        this.salaryPerHour = 0
    }

    calculateSalary = () =>{
        return this.workingHour*this.salaryPerHour
    }
}