export class Validation{
    checkNull = (id,spanID) =>{
        let valueData = document.getElementById(id).value
        let spanData = document.getElementById(spanID).innerHTML
        if(valueData == null || valueData == 0){
            spanData == 'Vui lòng không được để trống trường này'
            return true
        }else{
            spanData = ''
            return false
        }
    }
}