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
            let array = a.name.trim().split(' ')
            let array2 = b.name.trim().split(' ')
            let lastIndex = array[array.length-1]
            let lastIndex2 = array2[array2.length-1]
            return (lastIndex < lastIndex2 ? -1 : (lastIndex > lastIndex2 ? 1 : 0))
        })
    }
}