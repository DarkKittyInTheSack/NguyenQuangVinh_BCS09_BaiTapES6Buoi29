
import { Customer } from "../model/Customer.js"
import { Employee } from "../model/Employee.js"
import { ListPerson } from "../model/ListPerson.js"
import { Student } from "../model/Student.js"
import { Validation } from "./validation/validation.js"

let arrPerson = new ListPerson()

const openForm = (value, content = '') =>{
  switch(value){
      case 'student':
          content = `<div class="my-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="markMath">
            Điểm toán
          </label>
          <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="markMath" type="number" placeholder="Vui lòng nhập vào Điểm toán">
          <p class="text-red-500 text-xs italic" id="markMathError"></p>
        </div>

        <div class="my-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="markPhys">
            Điểm lý
          </label>
          <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="markPhys" type="number" placeholder="Vui lòng nhập vào Điểm lý">
          <p class="text-red-500 text-xs italic" id="markPhysError"></p>
        </div>

        <div class="my-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="markChems">
            Điểm hóa
          </label>
          <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="markChems" type="number" placeholder="Vui lòng nhập vào Điểm hóa">
          <p class="text-red-500 text-xs italic" id="markChemsError"></p>
        </div>`
        break;
      
      case 'employee':
          content = `<div class="my-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="workingHour">
            Số giờ làm
          </label>
          <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="workingHour" type="number" placeholder="Vui lòng nhập vào số giờ làm">
          <p class="text-red-500 text-xs italic" id="workingHourError"></p>
        </div>

        <div class="my-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="salaryPerHour">
            Lương theo giờ
          </label>
          <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="salaryPerHour" type="number" placeholder="Vui lòng nhập vào lương theo giờ">
          <p class="text-red-500 text-xs italic" id="salaryPerHourError"></p>
        </div>`
        break;

      case 'customer':
        content = `<div class="my-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="companyName">
          Tên công ty
        </label>
        <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="companyName" type="text" placeholder="Vui lòng nhập tên công ty">
        <p class="text-red-500 text-xs italic" id="companyNameError"></p>
      </div>

      <div class="my-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="billValue">
          Giá trị hóa đơn
        </label>
        <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="billValue" type="number" placeholder="Vui lòng nhập giá trị hóa đơn">
        <p class="text-red-500 text-xs italic" id="billValueError"></p>
      </div>

      <div class="my-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="rate">
          Đánh giá
        </label>
        <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rate" type="number" placeholder="Vui lòng nhập vào điểm đánh giá">
        <p class="text-red-500 text-xs italic" id="rateError"></p>
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

document.getElementById('filter').addEventListener('change', ()=>{
  let value = document.getElementById('filter').value
  showPersonData(arrPerson.fillterPersonList(value.toUpperCase()),value.toUpperCase())
})

const enableUpdate = (enterUpdate) =>{
    let update = document.querySelector('.update')
    enterUpdate ? update.style.display = "block" : update.style.display = "none"
    return enterUpdate
}

const enableAdd = (enterUpdate) =>{
  let update = document.querySelector('.add')
  enterUpdate ? update.style.display = "block" : update.style.display = "none"
  document.querySelector('form').reset()
  document.querySelector('#id').readOnly = false
}

const openAddData = ()=>{
  document.querySelector('.title').innerHTML = 'Thêm mới người dùng'
  enableUpdate(false)
  enableAdd(true)
}

const addToLocalStorage = () =>{
    localStorage.setItem('arrPerson', JSON.stringify(arrPerson.getList()))
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

const customColumn = (inputType = '',id = '',item) =>{
  let tempObj = {
    data:'',
    header:''
  }

  switch(inputType){
    case 'STUDENT':
      const {markMath,markPhys,markChems} = item

      let student =new Student()
      student.markMath = markMath
      student.markChems = markChems
      student.markPhys = markPhys
      tempObj.data = `<td class="px-6 py-4">
      ${student.averageMark()}
    </td>`
      tempObj.header = 'Điểm trung bình'
    break

    case 'EMPLOYEE':
      const {workingHour,salaryPerHour} = item
      let employee = new Employee()
      employee.workingHour = workingHour
      employee.salaryPerHour = salaryPerHour
      tempObj.data = `<td class="px-6 py-4">
      ${employee.calculateSalary().toLocaleString('it-IT',{type:'currency',currency:'VND'})}
    </td>`
      tempObj.header = 'Tổng lương theo giờ'
    break

    case 'CUSTOMER':
      const {companyName,billValue,rate} = item
      tempObj.data = `<td class="px-6 py-4">
      ${companyName}
    </td>`
      tempObj.header = 'Tên công ty '
    break

    default:
        tempObj.data = `<td class="px-6 py-4">
        ${setType(id)}
      </td>`
        tempObj.header = 'Loại người dùng'
    break
  }
  return tempObj
}

const showPersonData = (arr = arrPerson.getList(),custom = '') =>{
  let content = ''
  if(!arr || arr.length ==0){
    document.querySelector('tbody').innerHTML = ''
  }else{
    arr.forEach((item) =>{
      const {id,name,address,email} = item
      const {data,header} = customColumn(custom,id,item)
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
            ${data}
            <td class="px-6 py-4">
              <div class="flex">
                  <button onclick = "openEditForm('${id}','${setType(id).toLowerCase()}')" class="edit text-2xl me-4 text-green-500" data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"><i class="ri-edit-fill"></i></button>
                  <button class="text-2xl text-red-500" onclick="removePerson('${id}')"><i class="ri-delete-bin-fill"></i></button>
              </div>
            </td>
        </tr>`
        document.querySelector('tbody').innerHTML = content
        document.querySelector('.customColumn').innerHTML = header
    })
  }

}

const orderListByName = ()=>{
  arrPerson.sortListByAlphabetical()
  showPersonData()
}

showPersonData()

const getPersonInForm = () =>{
  let arrForm = document.querySelectorAll('form input')
    let personType = document.getElementById('type').value
    let getIdForUpdate = document.getElementById('id').value
    
    let person = {}, type = '',isValid = true,validation = new Validation()
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
      item.id == 'name' ? isValid &= validation.checkName(item.id)
      : item.id == 'email' ? isValid &= validation.checkEmail(item.id)
      : item.id == 'markMath' ? isValid &= validation.checkDataInRange(item.id,1,10,'Vui lòng nhập điểm toán hợp lệ')
      : item.id == 'markPhys' ? isValid &= validation.checkDataInRange(item.id,1,10,'Vui lòng nhập điểm lý hợp lệ')
      : item.id == 'markChems' ? isValid &= validation.checkDataInRange(item.id,1,10,'Vui lòng nhập điểm hóa hợp lệ')
      : item.id == 'workingHour' ? isValid &= validation.checkDataInRange(item.id,1,200,'Vui lòng nhập số giờ làm hợp lệ')
      : item.id == 'salaryPerHour' ? isValid &= validation.checkDataInRange(item.id,50000,200000,'Vui lòng nhập lương theo giờ hợp lệ')
      : item.id == 'billValue' ? isValid &= validation.checkDataInRange(item.id,10000,2000000,'Vui lòng nhập giá trị hóa đơn hợp lệ')
      : item.id == 'rate' ? isValid &= validation.checkDataInRange(item.id,1,5,'Vui lòng nhập điểm đánh giá hợp lệ')
      : isValid &= validation.checkNull(item.id)
      
      if(isValid){
        if(item.id == 'id' && !getIdForUpdate.includes(type)){
          person[item.id] = item.value+type
        }else{
          person[item.id] = item.value
        }
      }
    })
    
    if(isValid){
      return person
    }
}

const openEditForm = (data,type) =>{
  document.querySelector('.title').innerHTML = 'Cập nhật người dùng'
  document.querySelector('#id').readOnly = true
  enableAdd(false)
  enableUpdate(true)
  let content = openForm(type,'')
  document.querySelector('.specific').innerHTML = content
  let arrForm = document.querySelectorAll('form input','.specific input')

  document.getElementById('type').value = type
  document.getElementById('id').readOnly = true
  let person = arrPerson.getPersonFromList(data)
  
  arrForm.forEach((item,index) =>{
    item.value = person[`${item.id}`]
  })
}

const updatePerson = () =>{
  if(getPersonInForm() != null){
    let personID = document.getElementById('id').value
    arrPerson.getList()[arrPerson.getPersonIndexByID(personID)] = getPersonInForm()
    addToLocalStorage()
    showPersonData()
  }  
}

const addPersonData = () =>{
  let person = getPersonInForm()
    if(person){
      arrPerson.addPersonToList(person)
      addToLocalStorage()
      showPersonData()
      document.querySelector('form').reset()
    }
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
window.updatePerson = updatePerson
window.customColumn = customColumn
window.orderListByName = orderListByName


