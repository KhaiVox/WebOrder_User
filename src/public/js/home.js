// Order hbs

// Change state order
let valueState = document.getElementById('value-state').value
let lineState = document.querySelector('.process-sub-line')
let btnCancel = document.querySelector('.btn-cancel')
let processDes = document.querySelectorAll('.process-des-item')

switch (valueState) {
    case 'Chưa duyệt':
        processDes[0].style.color = '#eb0e0e'
        break
    case 'Đã duyệt':
        lineState.classList.add('w-25')
        btnCancel.setAttribute('disabled', 'disabled')
        btnCancel.style.border = '1px solid red'
        processDes[1].style.color = '#eb0e0e'
        break
    case 'Đang chuẩn bị':
        lineState.classList.remove('w-25')
        lineState.classList.add('w-50')
        btnCancel.setAttribute('disabled', 'disabled')
        btnCancel.style.border = '1px solid red'
        processDes[2].style.color = '#eb0e0e'
        break
    case 'Đang giao':
        lineState.classList.remove('w-50')
        lineState.classList.add('w-75')
        btnCancel.setAttribute('disabled', 'disabled')
        btnCancel.style.border = '1px solid red'
        processDes[3].style.color = '#eb0e0e'
        break
    case 'Hoàn tất':
        lineState.classList.remove('w-75')
        lineState.classList.add('w-100')
        btnCancel.setAttribute('disabled', 'disabled')
        btnCancel.style.border = '1px solid red'
        processDes[4].style.color = '#eb0e0e'
        break
}

// nếu đã hủy đơn sẽ disable button "Hủy đơn"

const valueStatusOrder = document.querySelector('.value-status').value
if (valueStatusOrder == 'Đã hủy') {
    btnCancel.innerHTML = 'Đã hủy'
    btnCancel.setAttribute('disabled', 'disabled')
    btnCancel.style.border = '1px solid red'
}
