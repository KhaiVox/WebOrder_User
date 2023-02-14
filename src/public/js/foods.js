var foodItemCheckbox = document.querySelectorAll('.order-check')
var selectAllOption = document.querySelector('.form-select-option')
var notifyChecked = document.querySelector('.notify-checked')
var btnAction = document.querySelector('.btn-action-check')

foodItemCheckbox.forEach(
    (item) =>
    (item.onchange = function() {
        var isChecked = document.querySelectorAll('input[name="food"]:checked').length

        if (isChecked > 0) {
            selectAllOption.removeAttribute('hidden')
            btnAction.removeAttribute('hidden')
            notifyChecked.innerHTML = `Bạn đã chọn <span>${isChecked}</span> mục`
        } else {
            selectAllOption.setAttribute('hidden', 'hidden')
            btnAction.setAttribute('hidden', 'hidden')
            notifyChecked.innerHTML = ''
        }
    }),
)

// Delete Action
var foodId
var btnDeleteFood = document.getElementById('btn-delete-food')
var deleteFormFood = document.forms['delete-food-form']

// lấy id của item được nhấn
$('#delete-course-modal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    foodId = button.data('id')
})

// button delete ở form dialog
btnDeleteFood.onclick = function() {
    // thêm action đường dẫn vào form delete vừa tạo
    deleteFormFood.action = '/foods/' + foodId + '?_method=DELETE'
    deleteFormFood.submit()
}

// đọc dữ liệu TYPE sản phẩm từ DB và hiển thị nội dung tương ứng
const itemType = document.getElementsByClassName('item__type-food')
for (let i = 0; i < itemType.length; i++) {
    if (itemType[i].innerText == 'drink') {
        itemType[i].innerText = 'Món nước'
    } else if (itemType[i].innerText == 'food') {
        itemType[i].innerText = 'Món ăn'
    } else if (itemType[i].innerText == 'sidefood') {
        itemType[i].innerText = 'Ăn kèm'
    }
}