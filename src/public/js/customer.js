// Delete Action
var customerId
var btnDeleteCustomer = document.getElementById('btn-delete-customer')
var deleteFormCustomer = document.forms['delete-customer-form']

// lấy id của item được nhấn
$('#delete-customer-modal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    customerId = button.data('id')
    console.log(customerId)
})

// button delete ở form dialog
btnDeleteCustomer.onclick = function() {
    // thêm action đường dẫn vào form delete vừa tạo
    deleteFormCustomer.action = '/customer/' + customerId + '?_method=DELETE'
    deleteFormCustomer.submit()
}