// trên 1 triệu sẽ thêm 1 dấu chấm
let valueTotal = document.querySelector('.number-total-value')
var type_value = parseInt(valueTotal.innerHTML)
type_value = type_value.toLocaleString('vi', { currency: 'VND' })
valueTotal.innerHTML = type_value
