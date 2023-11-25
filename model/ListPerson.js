export class ListPerson{
    constructor(){
        this.arrPerson = []
    }

    getList = () =>{
        return this.arrPerson
    }

    setList = (list = []) =>{
        this.arrPerson = list
    }

    addPersonToList = (Person) =>{
       this.arrPerson == null ? this.arrPerson = [] : this.arrPerson = this.arrPerson
        this.arrPerson.push(Person)
    }

    getPersonFromList = (id) =>{
        return this.arrPerson.find((item,index) => item.id == id)
    }

    getPersonIndexByID = (id) =>{
        return this.arrPerson.findIndex((item,index) => item.id == id)
    }

    removePerson = (id) =>{
        this.arrPerson.splice(this.getPersonIndexByID(id),1)
    }

    fillterPersonList = (key) =>{
        return this.arrPerson.filter((item,index) => (item.id).includes(key))
    }

    sortListByAlphabetical = () =>{
        this.arrPerson.sort((a,b) =>{
            return (a.name > b.name ? 1 : (a.name === b.name ? 0 : -1))
        })
    }
}