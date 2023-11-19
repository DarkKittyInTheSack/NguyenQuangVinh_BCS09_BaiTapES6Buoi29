
import { Customer } from "../model/Customer.js"
import { Employee } from "../model/Employee.js"
import { ListPerson } from "../model/ListPerson.js"
import { Student } from "../model/Student.js"

let arrPerson = new ListPerson()

document.getElementById('type').addEventListener('change', function(){
    document.querySelector('.specific').style.display = 'none'
    let value = document.getElementById('type').value
    let content =''

    switch(value){
        case 'student':
            content = `<div class="my-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="markMath">
              Điểm toán
            </label>
            <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="markMath" type="number" placeholder="Vui lòng nhập vào Điểm toán">
            <p class="text-red-500 text-xs italic"></p>
          </div>

          <div class="my-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="markPhys">
              Điểm lý
            </label>
            <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="markPhys" type="number" placeholder="Vui lòng nhập vào Điểm lý">
            <p class="text-red-500 text-xs italic"></p>
          </div>

          <div class="my-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="markChems">
              Điểm hóa
            </label>
            <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="markChems" type="number" placeholder="Vui lòng nhập vào Điểm hóa">
            <p class="text-red-500 text-xs italic"></p>
          </div>`
          break;
        
        case 'employee':
            content = `<div class="my-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="workingHour">
              Số giờ làm
            </label>
            <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="workingHour" type="number" placeholder="Vui lòng nhập vào số giờ làm">
            <p class="text-red-500 text-xs italic"></p>
          </div>

          <div class="my-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="salaryPerHour">
              Lương theo giờ
            </label>
            <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="salaryPerHour" type="number" placeholder="Vui lòng nhập vào lương theo giờ">
            <p class="text-red-500 text-xs italic"></p>
          </div>`
          break;

        case 'customer':
            content = `<div class="my-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="companyName">
              Tên công ty
            </label>
            <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="companyName" type="number" placeholder="Vui lòng nhập tên công ty">
            <p class="text-red-500 text-xs italic"></p>
          </div>

          <div class="my-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="billValue">
              Giá trị hóa đơn
            </label>
            <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="billValue" type="number" placeholder="Vui lòng nhập giá trị hóa đơn">
            <p class="text-red-500 text-xs italic"></p>
          </div>

          <div class="my-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="rate">
              Đánh giá
            </label>
            <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rate" type="number" placeholder="Vui lòng nhập vào điểm đánh giá">
            <p class="text-red-500 text-xs italic"></p>
          </div>`
          break;
    }

    document.querySelector('.specific').innerHTML = content
    document.querySelector('.specific').style.display = 'block'
})

const enableUpdate = (enterUpdate) =>{
    let update = document.querySelector('.update')
    enterUpdate ? update.style.display = "block" : update.style.display = "none"
}
enableUpdate(false)

const addToLocalStorage = (key) =>{
    localStorage.setItem(key, JSON.stringify(arrPerson.getList()))
}

const getFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('arrPerson'))
}

const setTypeID = (id,type) =>{
    return document.querySelector('.'+id).ariaValueMax.toUpperCase()
}

const showPersonData = () =>{
  let arrPerson = getFromLocalStorage('arrPerson')
  let content = ''

  arrPerson.forEach((item) =>{
    content += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              ${item.id}
          </th>
          <td class="px-6 py-4">
              ${item.name}
          </td>
          <td class="px-6 py-4">
              ${item.address}
          </td>
          <td class="px-6 py-4">
              ${item.email}
          </td>
          <td class="px-6 py-4">
            Type
          </td>
          <td class="px-6 py-4">
            <div class="flex">
                <button class="text-2xl me-4 text-green-500"><i class="ri-edit-fill"></i></button>
                <button class="text-2xl text-red-500"><i class="ri-delete-bin-fill"></i></button>
            </div>
          </td>
      </tr>`

      document.querySelector('tbody').innerHTML = content
  })
}

showPersonData()

const addPersonData = () =>{
    let arrForm = document.querySelectorAll('form input')
    let personType = document.getElementById('type').value
    let person = null
    switch(personType){
        case 'student':
            person = new Student()
            break;
        
        case 'employee':
            person = new Employee()
            break;
        
        case 'customer':
            person = new Customer()
            break;
    }
    arrForm.forEach((item,index) =>{
      person[item.id] = item.value
    })
    arrPerson.addPersonToList(person)
    addToLocalStorage('arrPerson')
}

window.addPersonData = addPersonData

