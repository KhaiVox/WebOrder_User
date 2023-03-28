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
        btnCancel.classList.add('hidden')
        processDes[1].style.color = '#eb0e0e'
        break
    case 'Đang chuẩn bị':
        lineState.classList.remove('w-25')
        lineState.classList.add('w-50')
        btnCancel.classList.add('hidden')
        processDes[2].style.color = '#eb0e0e'
        break
    case 'Đang giao':
        lineState.classList.remove('w-50')
        lineState.classList.add('w-75')
        btnCancel.classList.add('hidden')
        processDes[3].style.color = '#eb0e0e'
        break
    case 'Hoàn tất':
        lineState.classList.remove('w-75')
        lineState.classList.add('w-100')
        btnCancel.classList.add('hidden')
        processDes[4].style.color = '#eb0e0e'
        break
}
