
import { Customer } from "../model/Customer.js"
import { Employee } from "../model/Employee.js"
import { ListPerson } from "../model/ListPerson.js"
import { Student } from "../model/Student.js"

let arrPerson = new ListPerson()

const openForm = (value, content = '') =>{
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
        <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="companyName" type="text" placeholder="Vui lòng nhập tên công ty">
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
    return content
}

document.getElementById('type').addEventListener('change', function(){
    document.querySelector('.specific').style.display = 'none'
    let value = document.getElementById('type').value
    let content = openForm(value,'')
    document.querySelector('.specific').innerHTML = content
    document.querySelector('.specific').style.display = 'block'
})

const enableUpdate = (enterUpdate) =>{
    let update = document.querySelector('.update')
    enterUpdate ? update.style.display = "block" : update.style.display = "none"
}

const enableAdd = (enterUpdate) =>{
  let update = document.querySelector('.add')
  enterUpdate ? update.style.display = "block" : update.style.display = "none"
}

const openAddData = ()=>{
  document.querySelector('.title').innerHTML = 'Thêm mới người dùng'
  enableUpdate(false)
  enableAdd(true)
}

const addToLocalStorage = (key) =>{
    localStorage.setItem(key, JSON.stringify(arrPerson.getList()))
}

const getFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('arrPerson'))
}
arrPerson.setList(getFromLocalStorage())

const setType = (id) =>{
  let type = ''
  id.includes('STUDENT') ? type = 'STUDENT' : 
  id.includes('EMPLOYEE') ? type = 'EMPLOYEE':
  type = 'CUSTOMER'
  return type
}

const showPersonData = () =>{
  let arrPerson = getFromLocalStorage()
  let content = ''
  if(!arrPerson || arrPerson.length ==0){
    document.querySelector('tbody').innerHTML = ''
  }else{
    arrPerson.forEach((item) =>{
      const {id,name,address,email} = item
      content += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${id}
            </th>
            <td class="px-6 py-4">
                ${name}
            </td>
            <td class="px-6 py-4">
                ${address}
            </td>
            <td class="px-6 py-4">
                ${email}
            </td>
            <td class="px-6 py-4">
              ${setType(id)}
            </td>
            <td class="px-6 py-4">
              <div class="flex">
                  <button onclick = "openEditForm('${id}','${setType(id).toLowerCase()}')" class="edit text-2xl me-4 text-green-500" data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"><i class="ri-edit-fill"></i></button>
                  <button class="text-2xl text-red-500" onclick="removePerson('${id}')"><i class="ri-delete-bin-fill"></i></button>
              </div>
            </td>
        </tr>`
  
        document.querySelector('tbody').innerHTML = content
    })
  }

}

showPersonData()
const openEditForm = (data,type) =>{
  document.querySelector('.title').innerHTML = 'Cập nhật người dùng'
  enableAdd(false)
  enableUpdate(true)

  let content = openForm(type,'')
  document.querySelector('.specific').innerHTML = content
  let arrForm = document.querySelectorAll('form input','.specific input')

  document.getElementById('type').value = type
  let person = arrPerson.getPersonFromList(data)
  arrForm.forEach((item,index) =>{
    item.value = person[`${item.id}`]
  })
}

const addPersonData = () =>{
    let arrForm = document.querySelectorAll('form input')
    arrPerson.setList(getFromLocalStorage())
    let personType = document.getElementById('type').value
    let person = null, type = ''
    switch(personType){
        case 'student':
            person = new Student()
            type = 'STUDENT'
            break;
        
        case 'employee':
            person = new Employee()
            type = 'EMPLOYEE'
            break;
        
        case 'customer':
            person = new Customer()
            type = 'CUSTOMER'
            break;
    }
    arrForm.forEach((item,index) =>{
      item.id == 'id' ? person[item.id] = item.value+type : person[item.id] = item.value
    })
    arrPerson.addPersonToList(person)
    addToLocalStorage('arrPerson')
    showPersonData()
}

const removePerson = (id) =>{
  arrPerson.setList(getFromLocalStorage())
  arrPerson.removePerson(id)
  addToLocalStorage('arrPerson')
  showPersonData()
}

window.removePerson = removePerson
window.addPersonData = addPersonData
window.openAddData = openAddData
window.openEditForm = openEditForm


