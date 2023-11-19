import { Person } from "./Person.js";

export class Student extends Person{
    constructor(){
        super()
        this.markMath = 0
        this.markPhys = 0
        this.markChems = 0
    }

    averageMark = () =>{
        return (this.markMath + this.markPhys + this.markChems)/3
    }
}