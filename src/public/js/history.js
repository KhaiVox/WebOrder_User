// trên 1 triệu sẽ thêm 1 dấu chấm
let valueTotal = document.querySelector('.number-total-value')
var type_value = parseInt(valueTotal.innerHTML)
type_value = type_value.toLocaleString('vi', { currency: 'VND' })
valueTotal.innerHTML = type_value

// Data table
$(document).ready(function () {
    $('#table-history').DataTable()
})

// Display Date
const valueDay = document.querySelectorAll('.day_value')
valueDay.forEach((item) => (item.innerText = item.innerText.slice(0, 24)))
