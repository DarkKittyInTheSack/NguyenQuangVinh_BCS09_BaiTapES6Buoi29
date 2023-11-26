export class Validation{
    checkNull = (id) =>{
        let valueData = document.getElementById(id).value
        if(valueData == null || valueData == 0){
            document.getElementById(`${id}`+'Error').innerHTML = 'Vui lòng không được để trống trường này'
            return false
        }else{
            document.getElementById(`${id}`+'Error').innerHTML = ''
            return true
        }
    }

    checkName = (id) =>{
        let strRegex = /^[A-Za-z\s]*$/
        let valueData = document.getElementById(id).value
        if(!strRegex.test(valueData)){
            document.getElementById(`${id}`+'Error').innerHTML = 'Vui lòng nhập tên hợp lệ'
            return false
        }else{
            document.getElementById(`${id}`+'Error').innerHTML = ''
            return true
        }
    }

    checkEmail = (id) =>{
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let valueData = document.getElementById(id).value
        if(!emailRegex.test(valueData)){
            document.getElementById(`${id}`+'Error').innerHTML = 'Vui lòng nhập email hợp lệ'
            return false
        }else{
            document.getElementById(`${id}`+'Error').innerHTML = ''
            return true
        }
    }

    checkDataInRange = (id,min,max,errMessage) =>{
        let valueData =  document.getElementById(id).value
        if(valueData < max*1 && valueData >= min*1 ){
            document.getElementById(`${id}`+'Error').innerHTML = ''
            return true
        }else{
            document.getElementById(`${id}`+'Error').innerHTML = errMessage
            return false
        }
    }
}