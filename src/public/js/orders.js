// Data table
$(document).ready(function() {
    $('#table-public').DataTable()
})

$(document).ready(function() {
    $('#table-history').DataTable()
})

// Button show/hide detail
var boardDetail = document.querySelector('.order-overview')
var btnShowDetail = document.querySelector('.btn-show-detail')
var btnHideDetail = document.querySelector('.btn-hide-detail')

function showDetail() {
    boardDetail.classList.remove('hidden')
    btnShowDetail.classList.add('hidden')
}

function hideDetail() {
    boardDetail.classList.add('hidden')
    btnShowDetail.classList.remove('hidden')
}

// Display Date
const valueDay = document.querySelectorAll('.day_value')
valueDay.forEach((item) => (item.innerText = item.innerText.slice(0, 24)))

// Display Status Order
let valueCountStateFalse = 0
let valueCountStateTrue = 0
let valueCountBackup = 0
let valueCountTransfer = 0
const valueState = document.querySelectorAll('.btn-status')

for (let i of valueState) {
    if (i.innerText == 'Chưa duyệt') {
        valueCountStateFalse++
        i.classList.add('btn-status--red')
    } else if (i.innerText == 'Đã duyệt') {
        valueCountStateTrue++
        i.classList.add('btn-status--blue')
    } else if (i.innerText == 'Đang chuẩn bị') {
        valueCountBackup++
        i.classList.add('btn-status--blue')
    } else if (i.innerText == 'Đang giao') {
        valueCountTransfer++
        i.classList.add('btn-status--green')
    } else if (i.innerText == 'Hoàn tất') {
        i.classList.add('btn-status--green')
    } else if (i.innerText == 'Đã hủy') {
        i.classList.add('btn-status--red')
    }
}