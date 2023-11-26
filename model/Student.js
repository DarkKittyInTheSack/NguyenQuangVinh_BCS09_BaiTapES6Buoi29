import { Person } from "./Person.js";

export class Student extends Person{
    constructor(){
        super()
        this.markMath = 0
        this.markPhys = 0
        this.markChems = 0
    }

    averageMark = () =>{
        return (this.markMath*1 + this.markPhys*1 + this.markChems*1) / 3
    }
}